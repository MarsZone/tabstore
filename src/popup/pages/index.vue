<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useAppStore } from '@/stores/app.store'

const toast = useToast();

const store = useAppStore()

const name = computed(() => store.name)
const count = computed(() => store.count)

function getAllTabsData(){
  chrome.runtime.sendMessage({ type: 'getAllTabsData' });
}

function getStoreData(){
  chrome.runtime.sendMessage({ type: 'getStoreData' });
}

function show() {
  console.log('show')
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content',life: 3000 });
};

function openInNewWindow(this: any) {
  window.open('/src/tabstore/', '_blank');
}

</script>

<template>
  <div class="text-center m-4 flex flex-col gap-y-2">
    <h1 class="text-3xl font-bold underline pb-6">
      Hello world from Popup!
    </h1>

    <p>Name: {{ name }}</p>
    <p>Count: {{ count }}</p>

    <Toast />
    <Button label="Success" severity="success" @click="show" />

    <div class="flex gap-x-2 justify-center">
      <button
        class="btn btn-primary"
        @click="getAllTabsData"
      >
        GetAllTabs
      </button>
      <button
        class="btn btn-primary"
        @click="getStoreData"
      >
        GetStoreData
      </button>
    </div>

    <RouterLink
      class="underline"
      to="/common/about"
    >
      About
    </RouterLink>

    <RouterLink
      class="underline"
      to="/src/tabstore/"
      @click="openInNewWindow"
    >
      Tabstore
    </RouterLink>
  </div>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md bg-blue-500 text-white;
}

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
