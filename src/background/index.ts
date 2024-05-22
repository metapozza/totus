chrome.runtime.onInstalled.addListener(async (opt) => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Open side panel',
    contexts: ['all']
  });
})

chrome.contextMenus.onClicked.addListener((info, tab) => {

  if (!tab) {
    throw new Error("No tabs")
  }

  // Make sure the side panel is open.
  chrome.sidePanel.open({ tabId: tab.id });

  if (info.menuItemId === 'openSidePanel') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

export { }
