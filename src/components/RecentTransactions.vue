<script setup lang="ts">
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
            <tr>
                <th><h6>Your Latest Transactions</h6></th>
            </tr>
            </thead>
            <tbody>
                <tr
                    v-for="transaction, i in transactions"
                    :key="i"
                >
                    <td class="pr-0"><h6 class="text-[11px]">{{ transaction.humanBlockTime }}</h6></td>
                    <td class="pl-0"><a class="underline text-[11px]" target="_blank" :href="'https://solscan.io/tx/' + transaction.signature">{{ transaction.signature }}</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            isLoading: false,
            transactions: undefined as (undefined | {signature: string, humanBlockTime: string}[])
        }
    },
    props: {
        address: {
            default: undefined,
            type: PublicKey
        }
    },
    watch: {
        address(newVal, oldVal) {
            if(oldVal === undefined) {
                this.updateLatestTransactions(newVal)
            } else if(newVal.toBase58() !== oldVal.toBase58()) {
                this.updateLatestTransactions(newVal)
            }
        }
    },
    methods: {
        updateLatestTransactions(withAddress: PublicKey) {
            this.isLoading = true
            let connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4f08234d-ce4c-4bb8-9399-c9d914efc9e8")

            connection.getSignaturesForAddress(withAddress).then((signatures) => {
                this.transactions = signatures.slice(0, 5).map((v, i, a) => {
                    return {
                        signature: v.signature,
                        humanBlockTime: new Date(v.blockTime! * 1000).toLocaleDateString() + " " + new Date(v.blockTime! * 1000).toLocaleTimeString()
                    }
                }) as {signature: string, humanBlockTime: string}[]
            })
        }

    }
})
</script>