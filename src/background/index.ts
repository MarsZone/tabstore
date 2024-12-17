import { title } from "node:process";

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
  if (message.type === 'saveTabs') {
    // chrome.tabs.query({}, (tabs) => {
    //   console.log(tabs);
    // });
    chrome.windows.getCurrent({}, (currentWindow) => {
      chrome.tabs.query({ windowId: currentWindow.id },
        (tabs) => {
          console.log(tabs);
          let tabsData = []
          let windowId = tabs[0].windowId
          let catoregoryValue = message.catoregoryValue
          let category = {
            cid: 1,
            categoryTitle: catoregoryValue,
            list: [
              {
                topicId: 1,
                topic: "xxx",
                windowId,
                treeData: [
                  {
                    label: 'xxx',
                    children: {},
                  },
                ]
              },
            ],
          }
          let urlList = [];
          for (let tab of tabs) {
            let tmp = {
              tabId: tab.id,
              label: tab.title,
              title: tab.title,
              url: tab.url,
              favIconUrl: tab.favIconUrl,
            }
            urlList.push(tmp)
          }
          category.list[0].treeData[0].children = urlList;
          tabsData.push(category)
          chrome.storage.local.set({ tabsData }).then(() => {
            console.log(`Value is set to ${windowId}`);
          });
        });
    });
    //坑爹玩意
    // chrome.tabs.query({ currentWindow: true }, (tabs) => {
    //   console.log(tabs);

    // });
    // 如果你不想返回任何值，可以返回 undefined
    return true;
  }
  if (message.type === 'getTabsData') {
    chrome.storage.local.get("tabsData", (items) => {
      sendResponse({ success: true, data: items.tabsData });
    });
    // 告诉Chrome我们将异步发送响应
    return true;
  }
  if (message.type === 'getStoreData') {
    chrome.storage.local.get("tabsData").then((items) => {
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

export { }
