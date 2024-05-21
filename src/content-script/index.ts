import './index.scss'

const button = new DOMParser().parseFromString(
  `<button>SOLANA</button>`,
  'text/html'
).body.firstElementChild

if (button) {
  document.body?.append(button)
}

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
