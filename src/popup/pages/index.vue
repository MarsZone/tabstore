<script setup lang="ts">
// import { useToast } from "primevue/usetoast";
import {  onMounted ,ref} from 'vue'
import { useAppStore } from '@/stores/app.store'

// const toast = useToast();

const store = useAppStore()

const name = computed(() => store.name)
const count = computed(() => store.count)

let catoregoryValue = ref('')
let catoregoryOptions = ref([])

let topicValue = ref('')
let topicOptions = ref([])

let tabsData = [];
onMounted(() => {
  loadOptions()
})
function loadOptions(){
  chrome.runtime.sendMessage({ type: 'getTabsData' }, {}, (response: any) => {
    // 处理返回的数据
    console.log("收到返回");
    console.log(response.data);
    // catoregoryOptions = ref([])
    catoregoryOptions.value = []
    // 将数据存储在Vue组件的状态中
    tabsData = response.data;
    for(let item of tabsData){
      catoregoryOptions.value.push({
        value: item.cid,
        label: item.categoryTitle,
      })
    }
  });
}

function saveTabs() {
  chrome.runtime.sendMessage({ type: 'saveTabs', catoregoryValue: catoregoryValue.value });
}

function getStoreData() {
  chrome.runtime.sendMessage({ type: 'getStoreData'  });
}
// function show() {
//   console.log('show')
//   toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content',life: 3000 });
// };

function openInNewWindow(this: any) {
  window.open('/src/tabstore/', '_blank');
}

function onCatoregoryChange(value: any) {
  console.log('onCatoregoryChange', value)
  for(let item of tabsData){
    if(item.cid === value){
      topicOptions.value = []
      for(let topic of item.list){
        topicOptions.value.push({
          value: topic.topicId,
          label: topic.topic,
        })
      }

    }
  }
}


</script>

<template>
  <div class=" m-4 flex flex-col gap-y-2">
    <!-- <Toast /> -->
    <h1 class="text-3xl font-bold  pb-6">
      Fast to manage your tabs.
    </h1>

    Catoregory<el-select
      v-model="catoregoryValue" filterable allow-create default-first-option
      placeholder="Select a category or just add a new one" style="width: 100%" class="mx-auto "
      @change="onCatoregoryChange"
    >
      <el-option v-for="item in catoregoryOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    Topic<el-select
      v-model="topicValue" filterable allow-create default-first-option
      placeholder="Select a topic or just add a new one" style="width: 100%" class="mx-auto "
    >
      <el-option v-for="item in topicOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <el-button class="" @click="saveTabs">
      SaveTabs
    </el-button>
    <!-- <el-button class="" @click="getStoreData">
      GetStoreData
    </el-button> -->

    <el-button @click="openInNewWindow">
      ShowTabStore
    </el-button>

    <RouterLink class="underline mx-auto" to="/common/about">
      About
    </RouterLink>
  </div>
</template>

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
.el-button+.el-button {
    margin-left: 0px;
}
</style>
