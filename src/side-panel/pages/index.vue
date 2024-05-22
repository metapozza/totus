<script setup lang="ts">
</script>

<template>
  <div class="text-center m-4 flex flex-col gap-y-2">
    <ConnectionStatus
      :domain="domain"
      :is-connected="isConnected"
      :public-key="publicKey"
    ></ConnectionStatus>

    <!--<div class="flex flex-row gap-[10px] justify-center">
      <button
        @click="connectPhantom"
        id="connect-phantom"
        class="btn btn-square"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 593 493"
          fill="none"
        >
          <path
            d="M70.0546 493C145.604 493 202.38 427.297 236.263 375.378C232.142 386.865 229.852 398.351 229.852 409.378C229.852 439.703 247.252 461.297 281.592 461.297C328.753 461.297 379.119 419.946 405.218 375.378C403.386 381.811 402.471 387.784 402.471 393.297C402.471 414.432 414.375 427.757 438.643 427.757C515.108 427.757 592.03 292.216 592.03 173.676C592.03 81.3243 545.327 0 428.112 0C222.069 0 0 251.784 0 414.432C0 478.297 34.3405 493 70.0546 493ZM357.141 163.568C357.141 140.595 369.962 124.514 388.734 124.514C407.049 124.514 419.87 140.595 419.87 163.568C419.87 186.541 407.049 203.081 388.734 203.081C369.962 203.081 357.141 186.541 357.141 163.568ZM455.126 163.568C455.126 140.595 467.947 124.514 486.719 124.514C505.034 124.514 517.855 140.595 517.855 163.568C517.855 186.541 505.034 203.081 486.719 203.081C467.947 203.081 455.126 186.541 455.126 163.568Z"
            fill="#AB9FF2"
          />
        </svg>
      </button>

      <button class="btn btn-square">
        <img
          class="block w-[28px] h-[28px]"
          src="https://lh3.googleusercontent.com/YQnjQjJ6NuY_rxRwy8JA177ONpmPiOdFpud8zK-ebcS8-r3mQzwrzmqlueLSvKw1SsaoeBYua7XePZ632xXM4aHUzw=s60"
        />
      </button>
    </div>-->

    <label class="mt-[20px] input input-bordered flex items-center gap-2">
      <input
        v-model="searchText"
        type="text"
        class="grow border-none outline-none shadow-none"
        placeholder="Search Addresses, Tokens & Transactions"
      />
    </label>

    <div class="flex flex-row gap-[10px] justify-center">
      <button
        @click="search('https://solana.fm/')"
        id="connect-phantom"
        class="btn btn-sm flex-grow"
      >
        <img
          class="block w-[20px] h-[20px]"
          src="https://solana.fm/favicon-32x32.png"
        />
      </button>

      <button
        @click="search('https://explorer.solana.com/')"
        class="btn btn-sm flex-grow"
      >
        <img
          class="block w-[20px] h-[20px]"
          src="https://explorer.solana.com/favicon.ico"
        />
      </button>

      <button
        @click="search('https://solscan.io/')"
        class="btn btn-sm flex-grow"
      >
        <img
          class="block w-[20px] h-[20px]"
          src="https://solscan.io/favicon.ico"
        />
      </button>
    </div>

    <RouterLink
      class="underline"
      to="/common/about"
    >
      {{ publicKey ? publicKey.toBase58() : 'ERROR' }}
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { PublicKey } from '@solana/web3.js'
import extractDomain from 'extract-domain'

import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      searchText: undefined as string | undefined,
      domain: undefined as string | undefined,
      isConnected: false,
      publicKey: undefined as undefined | PublicKey,
    }
  },
  mounted() {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (!tabs[0].url) {
          throw new Error('No valid tab')
        }
        this.domain = extractDomain(tabs[0].url)?.toString()
      })
    })

    chrome.runtime.onMessage.addListener((message, sender) => {
      if (!sender.tab?.active) {
        throw new Error('NOT THE ACTIVE TAB')
      }

      switch (message.type) {
        case 'is-connected': {
          this.isConnected = message.value
        }
        case 'public-key': {
          this.publicKey = new PublicKey(message.value)
        }
      }

      return true
    })
  },
  methods: {
    search(domain: string) {
      try {
        let address = new PublicKey(this.searchText as string)
        chrome.tabs.create({ url: domain + 'address/' + this.searchText })
      } catch (e) {}
    },
  },
})
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
