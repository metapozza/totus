setInterval(() => {
    window.postMessage({context: "TOTUS", type: "is-connected", value: window.phantom.solana.isConnected}, "*")
    window.postMessage({context: "TOTUS", type: "public-key", value: window.phantom.solana.publicKey}, "*")
}, 1000)