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
function genUrlList(tabs){
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
  return urlList
}

function saveNewCategory(cid,windowId,formData,tabs) {
  cid=1
  let tabsData = []
  let catoregoryValue = formData.catoregoryValue
  let topicValue = formData.topicValue
  chrome.storage.local.get("tabsData", (items) => {
    if (items.tabsData) {
      tabsData = items.tabsData
      let maxCid = 1
      for (let tab of tabsData) {
        if (tab.cid > maxCid) {
          maxCid = tab.cid
        }
      }
      cid = maxCid + 1
    }
    let category = {
      cid,
      categoryTitle: catoregoryValue,
      list: [
        {
          topicId: 1,
          topic: topicValue,
          windowId,
          treeData: [
            {
              label: topicValue,
              children: {},
            },
          ]
        },
      ],
    }
    saveTabs(tabsData,category,tabs)
  });
}
function saveTabs(tabsData,category,tabs){
  let urlList = genUrlList(tabs)
  category.list[0].treeData[0].children = urlList;
  tabsData.push(category)
  chrome.storage.local.set({ tabsData }).then(() => {
    // console.log(`Value is set to ${windowId}`);
    console.log('tabsData saved')
  });
}

function saveTopics(cid,topicId,windowId,formData,tabs){
  chrome.storage.local.get("tabsData", (items) => {
    if(items.tabsData){
      let urlList = genUrlList(tabs)
      for(let item of items.tabsData){
        if(item.cid === cid){
          let category = item;
          if(topicId!==0){
            for(let topic of category.list){
              if(topic.topicId === topicId){
                topic.treeData = urlList
              }
            }
          }else{
            let maxTopicId = 1
            for(let topic of category.list){
              if(topic.topicId > maxTopicId){
                maxTopicId = topic.topicId
              }
            }
            topicId = maxTopicId+1
            let topic = {
              topicId,
              topic: formData.topicValue,
              windowId,
              treeData: [
                {
                  label: formData.topicValue,
                  children: urlList,
                },
              ]
            }
            item.list.push(topic)
          }
        }
      }
      chrome.storage.local.set({ tabsData:items.tabsData }).then(() => {
        // console.log(`Value is set to ${windowId}`);
        console.log('tabsData saved')
      });
    }
  })
}

let activeTabId;
let activeTab;
chrome.tabs.onActivated.addListener((activeInfo) => {
  activeTabId = activeInfo.tabId;
  // console.log(activeTabId);
  chrome.tabs.get(activeTabId, (tab) => {
    // console.log(tab);
    activeTab=tab;
  })
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse:any) => {
  if (message.type === 'saveTabs') {
    // chrome.tabs.query({}, (tabs) => {
    //   console.log(tabs);
    // });
    chrome.windows.getLastFocused({}, (currentWindow) => {
      chrome.tabs.query({ windowId: currentWindow.id },
        (tabs) => {
          console.log(tabs);
          // 如果cid 为0，topic肯定也是0
          // 新创建，新创建要看是否已经有了tabsData,有的话就取cid最大值+1
          // 如果cid不为0，topic可能为0或者不为0.
          // 如果topic 不为0，那就更新topic下面的children。
          // 如果为0，就新增一个，取这个category下的最大的topicId+1
          // 如果cid，0，topic为0，名称重复，就覆盖

          let tabsData = []
          let windowId = currentWindow.id
          let cid = message.formData.catoregoryId
          let topicId  = message.formData.topicId
          let catoregoryValue = message.formData.catoregoryValue
          let topicValue = message.formData.topicValue
          if(cid === 0){
            saveNewCategory(cid,windowId,message.formData,tabs)
          }else{
            saveTopics(cid,topicId,windowId,message.formData,tabs)
          }
        });
    });
    //坑爹玩意会获取不到
    // chrome.tabs.query({ currentWindow: true }, (tabs) => {
    //   console.log(tabs);
    // });
    // 如果你不想返回任何值，可以返回 undefined
    sendResponse({ success: true });
  }
  if(message.type === 'saveCurrentTab'){
    let cid = message.formData.catoregoryId
    let topicId  = message.formData.topicId
    let newTab = {
      tabId: activeTabId,
      title: activeTab.title,
      label: activeTab.title,
      favIconUrl: activeTab.favIconUrl,
      url : activeTab.url,
    }
    chrome.storage.local.get("tabsData", (items) => {
      if (items.tabsData) {
        let tabsData = items.tabsData;
        let category = tabsData.find(item => item.cid === cid);
        if (category) {
          if (topicId !== 0) {
            let topic = category.list.find(topic => topic.topicId === topicId);
            if (topic) {
              const tabExists = topic.treeData[0].children.some(child => child.tabId === newTab.tabId);
              if (!tabExists) {
                topic.treeData[0].children.push(newTab);
              }
            }
          }
        }
        chrome.storage.local.set({ tabsData }).then(() => {
          console.log('tabsData saved')
        });
      }
    });
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
  if (message.type === 'syncStoreData') {
    let tabsData = message.tabsData
    chrome.storage.local.set({ tabsData }).then(() => {
      console.log('tabsData saved')
    });
  }
  if(message.type === 'clearStoreData'){
    // chrome.storage.local.clear().then(() => {
    //   console.log('All data cleared');
    // });
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, (tabs) => {
      console.log(tabs[0]);
    });
  }
  sendResponse({ success: true });
});


console.log('hello world from background')

globalThis.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

export { }
