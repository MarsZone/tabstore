import { title } from "process";

chrome.runtime.onInstalled.addListener(async (opt) => {
  if (opt.reason === 'install') {
    await chrome.storage.local.clear()

    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL('src/setup/index.html?type=install'),
    })
  }

  if (opt.reason === 'update') {
    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL('src/setup/index.html?type=update'),
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getAllTabsData') {
    // chrome.tabs.query({}, (tabs) => {
    //   console.log(tabs);
    // });
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      console.log(tabs);
      let tabInfo = []
      let windowId = tabs[0].windowId
      for(let tab of tabs){
        let tmp = {
          id: tab.id,
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl,
        }
        tabInfo.push(tmp)
      }
      chrome.storage.local.set({ key: tabInfo }).then(() => {
        console.log(`Value is set to ${  windowId}`);
      });
    });
    // 如果你不想返回任何值，可以返回 undefined
    return undefined;
  }
  if(message.type === 'getStoreData'){
    chrome.storage.local.get("key").then((items) => {
      console.log(items);
    });
  }
});

console.log('hello world from background')

globalThis.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

export {}
