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
      list1: [
        {
          name: "John", id: 1, treeData: [
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
            {
              label: 'Level one 2',
              children: [
                {
                  label: 'Level two 2-1',
                  children: [
                    {
                      label: 'Level three 2-1-1',
                    },
                  ],
                },
                {
                  label: 'Level two 2-2',
                  children: [
                    {
                      label: 'Level three 2-2-1',
                    },
                  ],
                },
              ],
            },
          ]
        },
      ],
      list2: [
        { name: "Juan", id: 5, treeData: [] },
        { name: "Edgard", id: 6, treeData: [] },
        { name: "Johnson", id: 7, treeData: [] }
      ]
    };
  },
  methods: {
    add() {
      this.list.push({ name: "Juan" });
    },
    replace() {
      this.list = [{ name: "Edgard" }];
    },
    clone(el) {
      return {
        name: `${el.name} cloned`
      };
    },
    log(evt) {
      window.console.log(evt);
    },
    handleNodeClick(){
      
    }
  }
};
</script>

<template>
  <div>
    <!-- <h1>Hello, Vue!</h1> -->
    <div class="row">
      <div class="col-6">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3>Category A</h3>
            </div>
          </template>
          <Draggable class="list-group" :list="list1" group="people" item-key="name" @change="log">
            <template #item="{ element, index }">
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
      <div class="col-6">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3>Category B</h3>
            </div>
          </template>
          <Draggable class="list-group" :list="list2" group="people" item-key="name" @change="log">
            <template #item="{ element, index }">
              <div class="list-group-item">
                <!-- {{ element.name }} {{ index }} -->
                <el-tree
                  style="max-width: 600px" :data="element.treeData" :props="defaultProps"
                  @node-click="handleNodeClick"
                />
              </div>
            </template>
          </Draggable>
          <!-- <template #footer>
            Footer content
          </template> -->
        </el-card>
      </div>
    </div>
  </div>
</template>


<style scoped></style>