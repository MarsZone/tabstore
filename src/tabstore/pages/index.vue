<script>
import draggable from "vuedraggable";
import { ElLoading,ElMessage } from 'element-plus'
import emitter from '../mitt';
import RenameDialog from './components/RenameDialog.vue';


export default {
  name: "TwoLists",
  display: "Two Lists",
  order: 1,
  components: {
    Draggable: draggable,
    RenameDialog
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      dialogVisible:  false,
      isLoadedData: false,
      loadingData: true,
      selectType:"",
      notice:"",
      selectCategory:{},
      topicSelect:{},
      tabSelect:{},
      tabsData: [],
    };
  },
  mounted() {
    this.loadData();
    fetch('http://119.28.129.221:8088/?api=getvalue&key=notice')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // 在这里处理返回的数据
        this.notice = data.value
      })
      .catch(error => {
        console.error('Error:', error);
        // 在这里处理错误
      });

    
    emitter.on('topbar', e => {
        if(e.cmd==='loadData'){
          ElMessage({
            message: 'Data load successed',
            type: 'success',
          })
        }
        if(e.cmd==='clearStoreData'){
          ElMessage({
            message: 'Data was deleted',
            type: 'success',
          })
        }
        if(e.cmd==='uploadDone'){
          ElMessage({
            message: 'Data was uploaded',
            type: 'success',
          })
          return
        }
        this.loadData();
      }
    )
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("index Receive:")
      if (message.type === 'saveCurrentTab' || message.type === 'saveTabs') {
        ElMessage({
          message: 'Data saved successed',
          type: 'success',
        })
        const loadingInstance = ElLoading.service({ fullscreen: true })
        setTimeout(() => {
          this.loadData();
          loadingInstance.close()
        }, 500);
      }
    });
  },
  methods: {
    loadData(){
      // 发送消息给后台脚本
      chrome.runtime.sendMessage({ type: 'getTabsData' }, {}, (response) => {
        // 处理返回的数据
        console.log("收到返回");
        console.log(response.data);
        this.tabsData = response.data;
        this.loadingData = false
        this.isLoadedData = true
        if (!response.data) {
          //展示无数据
          this.isLoadedData = false
        }
      });
    },
    log(evt) {
      window.console.log(evt);
    },
    handleNodeClick(node) {
      console.log(node.favIconUrl)
      if (node.url) {
        window.open(node.url, '_blank');
      }
    },
    loadError(e) {
      console.log(e)
    },
    getUrl(data) {
      return data.favIconUrl
    },
    openAllTabs(data) {
      // console.log(data)
      // for(let children of data.children){
      //   console.log(children.url)
      // }
      chrome.windows.create({
        url: data.children.map(child => child.url),state: 'maximized'
      });
    },
    saveToChrome(){
      chrome.runtime.sendMessage({ type: 'syncStoreData', tabsData: this.tabsData }, {}, (response) => {
        console.log("已更新");
      });
    },
    confirmRemove(element){
      this.selectType = "topic"
      this.topicSelect = element
      this.dialogVisible = true
    },
    removeTab(element,data){
      console.log(element)
      console.log(data)
      this.selectType = "tab"
      this.topicSelect = element
      this.tabSelect = data
      this.dialogVisible = true

    },
    deleteItem(){
      this.dialogVisible = false
      if(this.selectType === 'topic'){
        this.removeTopicById()
      }
      if(this.selectType === 'tab'){
        this.removeTabById()
      }
      this.saveToChrome()
    },
    removeTopicById() {
      for (let item of this.tabsData) {
        item.list = item.list.filter(topic => topic.topicId !== this.topicSelect.topicId);
      }
    },
    removeTabById() {
     this.topicSelect.treeData[0].children = this.topicSelect.treeData[0].children.filter(tab => tab.tabId !== this.tabSelect.tabId);
    },
    isTopic(data) {
      if (data.children) {
        return true
      }
      return false;
    },
    onNameSubmit(name){
      // console.log(name)
      this.selectCategory.categoryTitle=name
      this.saveToChrome()
    },
    upCategory(item){
      let index = this.tabsData.indexOf(item);
      if(index===0){
        ElMessage({
          message: 'Sorry you cant move it up.Its first place.',
          type: 'warning',
        })
      }else{
       let upper = this.tabsData[index-1] 
       this.tabsData[index-1] = item
       this.tabsData[index] = upper
      }
      this.saveToChrome()
    },
    downCategory(item){
      let index = this.tabsData.indexOf(item);
      if(index===this.tabsData.length-1){
        ElMessage({
          message: 'Sorry you cant move it down.Its last place.',
          type: 'warning',
        })
      }else{
       let downItem = this.tabsData[index+1]
       this.tabsData[index+1] = item
       this.tabsData[index] = downItem
      }
      this.saveToChrome()
    },
    removeCategory(item){
      this.selectCategory = item
      this.$refs.RenameDialog.openDialog();
    }
  }
};
</script>

<template>
  <div v-loading="loadingData">
    <!-- <h1>Hello, Vue!</h1> -->
    <Panel header="Notice" class="fixed bottom-5 left-5 notice w-300 h-200">
      <p class="m-0">
        {{ notice }}
      </p>
    </Panel>
    <div v-if="!isLoadedData" class="no-data-tips flex items-center justify-center h-screen">
      <div class="text-center text-xl">
        Please Save Your Tabs First
        <img src="@/assets/save.png" alt="Logo Top">
      </div>
    </div>
    <div class="row">
      <div v-for="(item) in tabsData " :key="item.cid" class="col-6 col-item">
        <el-card>
          <template #header>
            <div class="card-header custom-tree-node">
              <h3>{{ item.categoryTitle }}</h3>
              <div class="operbtn">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Up Category"
                  placement="top"
                >
                  <el-icon class="ml-2" @click.stop="upCategory(item)">
                    <ArrowUp />
                  </el-icon>
                </el-tooltip>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Down Category"
                  placement="top"
                >
                  <el-icon class="ml-2" @click.stop="downCategory(item)">
                    <ArrowDown />
                  </el-icon>
                </el-tooltip>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Rename"
                  placement="top"
                >
                  <el-icon class="ml-2" @click.stop="removeCategory(item)">
                    <Edit />
                  </el-icon>
                </el-tooltip>
              </div>
            </div>
          </template>
          <Draggable class="list-group" :list="item.list" group="people" item-key="name" @change="log">
            <template #item="{ element }">
              <div class="list-group-item">
                <!-- {{ element.name }} {{ index }} -->
                <el-tree
                  style="max-width: 600px" :data="element.treeData" :props="defaultProps"
                  @node-click="handleNodeClick"
                >
                  <template #default="{ node, data }">
                    <span class="custom-tree-node">
                      <span v-tooltip="node.label">
                        <el-image style="width: 10px; height: 10px" lazy :src="getUrl(data)" />
                        {{ node.label.length > 30 ? `${node.label.slice(0, 30)}...` : node.label }}
                      </span>
                      <span v-if="!isTopic(data)">
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="Remove this tab"
                          placement="top"
                        >
                          <el-icon class="ml-2" @click.stop="removeTab(element,data)">
                            <Remove />
                          </el-icon>
                        </el-tooltip>
                      </span>
                      <span v-if="isTopic(data)">
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="Open all tabs"
                          placement="top"
                        >
                          <el-icon @click.stop="openAllTabs(data)">
                            <ChromeFilled />
                          </el-icon>
                        </el-tooltip>
                        
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="Delete this topic"
                          placement="top"
                        >
                          <el-icon class="ml-2" @click.stop="confirmRemove(element)">
                            <Delete />
                          </el-icon>
                        </el-tooltip>
                      </span>
                      <!-- <a @click="append(data)"> Append </a>
                        <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a> -->
                    </span>
                  </template>
                </el-tree>
              </div>
            </template>
          </Draggable>
          <template #footer>
            <!-- <Button class="btn btn-primary" @click="OpenAllTabs(item)">
              ClearTopics
            </Button> -->
          </template>
        </el-card>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="500"
    >
      <span>Are you confirm to delete {{ selectType }}?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="deleteItem">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

    <RenameDialog ref="RenameDialog" @submit-new-name="onNameSubmit" />
  </div>
</template>


<style scoped>
.col-item {
  margin-bottom: 10px;
}
.fr{
  float: right; padding: 3px 0
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.notice{
  z-index: 1000;
  width: 300px;
  height: 100px;
}
</style>