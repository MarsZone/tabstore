<template>
    <div class="wrapper">
      <el-button type="danger" @click="test">测试按钮</el-button>
    </div>
  </template>
  <script setup>
  const test = () => {
    chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.sendRequest(tab.id, { popAction: "Test"});
    });
  }
  </script>
  <style scoped>
  .wrapper{
    width: 100px;
    height: 100px;
    background-color: aquamarine;
  }
  </style>