namespace global {
    interface Window { solana: any; }
}

window.addEventListener("message", (event) => {
    if(event.data.context !== "TOTUS") {
        throw new Error("CONTEXT IS WRONG")
    }

    switch (event.data.type) {
        case 'is-connected': {
            chrome.runtime.sendMessage({context: 'TOTUS', type: 'is-connected', value: event.data.value})
        }
        case 'public-key': {
            chrome.runtime.sendMessage({context: 'TOTUS', type: 'public-key', value: event.data.value})
        }
    }
});

chrome.runtime.onMessage.addListener((message) => {
    switch (message.type) {
      case 'connect': {
        console.log("c")
        window.postMessage({context: "TOTUS", type: 'connect'}, "*")
      }
      case 'disconnect': {
        console.log("d")
        window.postMessage({context: "TOTUS", type: 'disconnect'}, "*")
      }
    }

    return true
  })

function injectScript (src: string) {
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL(src);
    s.onload = () => s.remove();
    (document.head || document.documentElement).append(s);
}

injectScript('assets/injected-script.js')


self.onerror = function (message, source, lineno, colno, error) {
    console.info(
        `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
    )
}