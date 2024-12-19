<script>
import draggable from "vuedraggable";
export default {
  name: "TwoLists",
  display: "Two Lists",
  order: 1,
  components: {
    Draggable: draggable
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      isLoadedData:false,
      loadingData:true,
      tabsData: [
        {
          cid: 1,
          categoryTitle: "项目",
          list: [
            {
              id: 1,
              topic: "John",
              treeData: [
                {
                  label: 'Level one 1',
                  children: [],
                },
              ]
            },
          ],
        },
        {
          cid: 2,
          categoryTitle: "面试",
          list: [
            {
              id: 1,
              topic: "John",
              treeData: []
            },
          ],
        },
        {
          cid: 3,
          categoryTitle: "算法",
          list: [
            {
              id: 1,
              topic: "XXX",
              treeData: [
                {
                  label: 'Level one 2',
                  children: [
                  ],
                },
              ]
            },
          ],
        }
      ],
    };
  },
  mounted() {
    // 发送消息给后台脚本
    chrome.runtime.sendMessage({ type: 'getTabsData' }, {}, (response) => {
      // 处理返回的数据
      console.log("收到返回");
      console.log(response.data);
      this.tabsData = response.data;
      this.loadingData=false
      this.isLoadedData=true
      if(!response.data){
        //展示无数据
        this.isLoadedData=false
      }
    });
  },
  methods: {
    log(evt) {
      window.console.log(evt);
    },
    handleNodeClick(node) {
      console.log(node.favIconUrl)
      if (node.url) {
        // window.open(node.url, '_blank');
      }
    },
    loadError(e){
      console.log(e)
    },
    getUrl(node){
      console.log(node)
      return node.favIconUrl
    }
  }
};
</script>

<template>
  <div v-loading="loadingData">
    <!-- <h1>Hello, Vue!</h1> -->
    <div class="no-data-tips flex items-center justify-center h-screen">
      <div class="text-center text-xl">
        Please Save Your Tabs First
        <img src="@/assets/save.png" alt="Logo Top">
      </div>
    </div>
    <div class="row">
      <div v-for="(item) in tabsData " :key="item.cid" class="col-6 col-item">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3>{{ item.categoryTitle }}</h3>
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
                  <template #default="{ node,data }">
                    <span class="custom-tree-node">
                      <span v-tooltip="node.label">
                        <el-image style="width: 10px; height: 10px" lazy :src="getUrl(data)" />
                        {{ node.label.length > 30 ? `${node.label.slice(0, 30) }...` : node.label }}</span>
                      <span>
                        <!-- <a @click="append(data)"> Append </a>
                        <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a> -->
                      </span>
                    </span>
                  </template>
                </el-tree>
              </div>
            </template>
          </Draggable>
          <template #footer>
            <Button class="btn btn-primary">
              OpenAll
            </Button>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>


<style scoped>
.col-item{
  margin-bottom: 10px;
}
</style>