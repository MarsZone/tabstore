<script setup lang="ts">
// import { useToast } from "primevue/usetoast";
import { ref } from 'vue'
import { useAppStore } from '@/stores/app.store'

// const toast = useToast();

const store = useAppStore()

const name = computed(() => store.name)
const count = computed(() => store.count)

function getAllTabsData(){
  chrome.runtime.sendMessage({ type: 'getAllTabsData' });
}

function getStoreData(){
  chrome.runtime.sendMessage({ type: 'getStoreData' });
}

// function show() {
//   console.log('show')
//   toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content',life: 3000 });
// };

function openInNewWindow(this: any) {
  window.open('/src/tabstore/', '_blank');
}

const value = ref('')
const options = [
  {
    value: 'CatoregoryA',
    label: 'CatoregoryA',
  },
]

</script>

<template>
  <div class=" m-4 flex flex-col gap-y-2">
    <!-- <Toast /> -->
    <!-- <h1 class="text-3xl font-bold underline pb-6">
      Hello world from Popup!
    </h1> -->

    <!-- <p>Name: {{ name }}</p>
    <p>Count: {{ count }}</p> -->
    <el-select
      v-model="value"
      filterable
      allow-create
      default-first-option
      placeholder="Select a category"
      style="width: 240px"
      class="mx-auto"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    

    
    <div class="flex gap-x-2 justify-center">
      <el-button
        class=""
        @click="getAllTabsData"
      >
        GetAllTabs
      </el-button>
      <el-button
        class=""
        @click="getStoreData"
      >
        GetStoreData
      </el-button>
    </div>

    <!-- <RouterLink
      class="underline"
      to="/src/tabstore/"
      @click="openInNewWindow"
    >
      Tabstore
    </RouterLink> -->
    <el-button @click="openInNewWindow">
      ShowTabStore
    </el-button>
    
    <RouterLink
      class="underline mx-auto"
      to="/common/about"
    >
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
</style>
