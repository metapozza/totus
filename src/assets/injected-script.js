setInterval(() => {
    window.postMessage({context: "TOTUS", type: "is-connected", value: window.phantom.solana.isConnected}, "*")
    window.postMessage({context: "TOTUS", type: "public-key", value: window.phantom.solana.publicKey?.toBase58()}, "*")
}, 1000)

window.addEventListener("message", (event) => {
    if(event.data.context !== "TOTUS") {
        throw new Error("CONTEXT IS WRONG")
    }

    switch (event.data.type) {
        case 'connect': {
            window.phantom.solana.connect()
        }
        case 'disconnect': {
            window.phantom.solana.disconnect()
        }
    }
});