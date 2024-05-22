<script setup lang="ts">
</script>

<template>
    <div class="totus-conn-status flex flex-row items-center">
        
        <div class="flex flex-row items-center text-left">
            <div class="totus-conn-status-circle mr-[10px] mt-[-12px] rounded-full h-[10px] w-[10px]" v-bind:class="[isConnected ? 'bg-green-500 is-connected' : 'bg-slate-500']"></div>
            <div>
                <h2>{{ domain }}</h2>
                <h6 class="text-slate-500">{{ isConnected ? "Connected" : "Not connected" }}</h6>
            </div>
        </div>

        <div class="flex-grow"></div>
        

        <button
            @click="isConnected ? disconnect() : connect()"
            id="connect-phantom"
            class="btn"
        >
            <div class="flex flex-row text-left gap-2 items-center">
                <div>
                    <h3 class="font-[800]">{{ isConnected ? "Disconnect" : "Connect" }}</h3>
                    <h6 class="text-slate-500">{{ isConnected ? publicKey?.toBase58().substring(0, 5) + "..." + publicKey?.toBase58().substring(publicKey?.toBase58().length - 5, publicKey?.toBase58().length) : "" }}</h6>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 593 493" fill="none">
                    <path d="M70.0546 493C145.604 493 202.38 427.297 236.263 375.378C232.142 386.865 229.852 398.351 229.852 409.378C229.852 439.703 247.252 461.297 281.592 461.297C328.753 461.297 379.119 419.946 405.218 375.378C403.386 381.811 402.471 387.784 402.471 393.297C402.471 414.432 414.375 427.757 438.643 427.757C515.108 427.757 592.03 292.216 592.03 173.676C592.03 81.3243 545.327 0 428.112 0C222.069 0 0 251.784 0 414.432C0 478.297 34.3405 493 70.0546 493ZM357.141 163.568C357.141 140.595 369.962 124.514 388.734 124.514C407.049 124.514 419.87 140.595 419.87 163.568C419.87 186.541 407.049 203.081 388.734 203.081C369.962 203.081 357.141 186.541 357.141 163.568ZM455.126 163.568C455.126 140.595 467.947 124.514 486.719 124.514C505.034 124.514 517.855 140.595 517.855 163.568C517.855 186.541 505.034 203.081 486.719 203.081C467.947 203.081 455.126 186.541 455.126 163.568Z" fill="#AB9FF2"/>
                </svg>
            </div>
        </button>
    </div>

    <RecentTransactions
      v-if="isConnected"
      :address="publicKey"
    ></RecentTransactions>
</template>

<script lang="ts">
import { PublicKey } from '@solana/web3.js'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        domain: {
            default: undefined,
            type: String
        },
        isConnected: {
            default: false,
            type: Boolean
        },
        publicKey: {
            default: undefined,
            type: PublicKey
        }
    },
    methods: {
        connect() {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id!, {context: 'TOTUS', type: 'connect'})
            })
        },
        disconnect() {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id!, {context: 'TOTUS', type: 'disconnect'})
            })
        }
    }
})
</script>

<style>

.totus-conn-status-circle{
    animation: ease-in-out .314s;
}

.totus-conn-status-circle.is-connected{
    animation: totus-conn-status-circle 1.314s ease-in-out 0s infinite;
}

@keyframes totus-conn-status-circle {
    0% {transform: scale(0.9);}
    50% {transform: scale(1.1);}
    100% {transform: scale(0.9);}
}

</style>