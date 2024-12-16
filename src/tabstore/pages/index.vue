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
                  children: [
                    {
                      label: 'Level two 1-1',
                      children: [
                        {
                          label: 'Level three 1-1-1',
                        },
                      ],
                    },
                  ],
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
              treeData: [
                {
                  label: 'Level one 2',
                  children: [
                  ],
                },
              ]
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
  methods: {
    log(evt) {
      window.console.log(evt);
    },
    handleNodeClick() {
    }
  }
};
</script>

<template>
  <div>
    <!-- <h1>Hello, Vue!</h1> -->
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
                />
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