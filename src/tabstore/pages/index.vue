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
      isLoadedData: false,
      loadingData: true,
      tabsData: [],
    };
  },
  mounted() {
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
  methods: {
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
    OpenAllTabs(data) {
      // console.log(data)
      // for(let children of data.children){
      //   console.log(children.url)
      // }
      chrome.windows.create({
        url: data.children.map(child => child.url),state: 'maximized'
      });
    },
    isTopic(data) {
      if (data.children) {
        return true
      }
      return false;
    }
  }
};
</script>

<template>
  <div v-loading="loadingData">
    <!-- <h1>Hello, Vue!</h1> -->
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
                  <template #default="{ node, data }">
                    <span class="custom-tree-node">
                      <span v-tooltip="node.label">
                        <el-image style="width: 10px; height: 10px" lazy :src="getUrl(data)" />
                        {{ node.label.length > 30 ? `${node.label.slice(0, 30)}...` : node.label }}
                      </span>
                      <span v-if="isTopic(data)">
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="Open all tabs"
                          placement="top"
                        >
                          <el-icon @click.stop="OpenAllTabs(data)">
                            <ChromeFilled />
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
  </div>
</template>


<style scoped>
.col-item {
  margin-bottom: 10px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>