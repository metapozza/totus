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
        <h5>{{ isConnected ? publicKey?.toBase58().substring(0, 5) + "..." + publicKey?.toBase58().substring(publicKey?.toBase58().length - 5, publicKey?.toBase58().length) : "" }}</h5>
        <div v-if="isConnected" class="ml-[3px] w-[16px] h-[16px] cursor-pointer">
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
        </div>
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