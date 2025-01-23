<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/stores/app.store'

// const toast = useToast();

const store = useAppStore()

const name = computed(() => store.name)
const count = computed(() => store.count)
const formSize = ref<ComponentSize>('default')

let catoregoryOptions = ref([])
let topicOptions = ref([])

interface RuleForm {
  catoregoryId: number
  topicId: number
  catoregoryValue: string
  topicValue: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  catoregoryId: 0,
  topicId: 0,
  catoregoryValue: '',
  topicValue: '',
})

const rules = reactive<FormRules<RuleForm>>({
  catoregoryValue: [
    {
      required: true,
      message: 'Please select or create a category',
      trigger: 'change',
    },
  ],
  topicValue: [
    {
      required: true,
      message: 'Please select or create a topic',
      trigger: 'change',
    },
  ],
})

let tabsData = [];
onMounted(() => {
  loadOptions()
})
function loadOptions() {
  chrome.runtime.sendMessage({ type: 'getTabsData' }, {}, (response: any) => {
    // 处理返回的数据
    console.log("点击返回");
    console.log(response.data);
    // catoregoryOptions = ref([])
    catoregoryOptions.value = []
    // 将数据存储在Vue组件的状态中
    tabsData = response.data;
    if (tabsData) {
      for (let item of tabsData) {
        catoregoryOptions.value.push({
          value: item.cid,
          label: item.categoryTitle,
        })
      }
    }
  });
}
const saveCurrentTab = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('submit!')
      chrome.runtime.sendMessage({ type: 'saveCurrentTab', formData: ruleForm }, {}, (response: any) => {});
      ElMessage({
        message: 'Current tab saved successfully',
        type: 'success',
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const saveTabs = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('submit!')
      chrome.runtime.sendMessage({ type: 'saveTabs', formData: ruleForm }, {}, (response: any) => {
        chrome.runtime.sendMessage({ type: 'getTabsData' }, {}, (response: any) => {
          console.log("收到返回");
          console.log(response.data);
          console.log(`Rule${ruleForm.catoregoryValue}`)
          console.log(`Rule${ruleForm.topicValue}`)
          catoregoryOptions.value = []
          for (let cate of response.data) {
            catoregoryOptions.value.push({
              value: cate.cid,
              label: cate.categoryTitle,
            })
            if (cate.categoryTitle === ruleForm.catoregoryValue) {
              if (ruleForm.catoregoryId === 0) {
                ruleForm.catoregoryId = cate.cid
              }
              topicOptions.value = []
              for (let topic of cate.list) {
                topicOptions.value.push({
                  value: topic.topicId,
                  label: topic.topic,
                })
                if (topic.topic === ruleForm.topicValue) {
                  if (ruleForm.topicId === 0) {
                    ruleForm.topicId = topic.topicId
                  }
                }
              }
            }
          }
          ElMessage({
            message: 'Current window tabs saved successfully',
            type: 'success',
          })
        });
      });
    } else {
      console.log('error submit!', fields)
    }
  })
}

function getStoreData() {
  chrome.runtime.sendMessage({ type: 'getStoreData' });
}

function clearStoreData() {
  chrome.runtime.sendMessage({ type: 'clearStoreData' });
}
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab);
  return tab;
}
// function show() {
//   console.log('show')
//   toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content',life: 3000 });
// };

function openInNewWindow(this: any) {
  window.open('/src/tabstore/index.html', '_blank');
}

function onCatoregoryChange(value: any) {
  console.log('onCatoregoryChange', value)
  if (tabsData) {
    for (let item of tabsData) {
      if (item.cid === value) {
        topicOptions.value = []
        for (let topic of item.list) {
          topicOptions.value.push({
            value: topic.topicId,
            label: topic.topic,
          })
        }
      }
    }
  }

}

function onCaOptionClick(item) {
  ruleForm.catoregoryId = item.value
  ruleForm.catoregoryValue = item.label
}

function onTopicOptionClick(item) {
  ruleForm.topicId = item.value
  ruleForm.topicValue = item.label
}

function onTopicChange(value: any) {
  console.log('onTopicChange', value)
  ruleForm.topicId = 0
  for (let topic of topicOptions.value) {
    if (topic.label === value) {
      ruleForm.topicId = topic.value
      ruleForm.topicValue = topic.label
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

    <el-form
      ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" :size="formSize" status-icon
    >
      <el-form-item label="Catoregory" prop="catoregoryValue">
        <el-select
          v-model="ruleForm.catoregoryValue" filterable allow-create default-first-option
          placeholder="Select a category or just add a new one" style="width: 100%" class="mx-auto "
          @change="onCatoregoryChange"
        >
          <el-option
            v-for="item in catoregoryOptions" :key="item.value" :label="item.label" :value="item.value"
            @click="onCaOptionClick(item)"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Topic" prop="topicValue">
        <el-select
          v-model="ruleForm.topicValue" filterable allow-create default-first-option
          placeholder="Select a category or just add a new one" style="width: 100%" class="mx-auto "
          @change="onTopicChange"
        >
          <el-option
            v-for="item in topicOptions" :key="item.value" :label="item.label" :value="item.value"
            @click="onTopicOptionClick(item)"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button class="w-full" @click="saveTabs(ruleFormRef)">
        SaveTabs
      </el-button>
    </el-row>
    <el-row>
      <el-button class="w-full" @click="saveCurrentTab(ruleFormRef)">
        SaveCurrentTab
      </el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button class="w-full" @click="getStoreData">
          GetStoreData
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="w-full" @click="clearStoreData">
          ClearStoreData
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-button class="w-full" @click="openInNewWindow">
        ShowTabStore
      </el-button>
    </el-row>


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
