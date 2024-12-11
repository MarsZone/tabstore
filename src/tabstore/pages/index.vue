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
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
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
        name: `${el.name  } cloned`
      };
    },
    log(evt) {
      window.console.log(evt);
    }
  }
};
</script>

<template>
  <div>
    <h1>Hello, Vue!</h1>
    <div class="row">
      <div class="col-3">
        <h3>Draggable 1</h3>
        <Draggable
          class="list-group"
          :list="list1"
          group="people"
          item-key="name"
          @change="log"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              {{ element.name }} {{ index }}
            </div>
          </template>
        </Draggable>
      </div>

      <div class="col-3">
        <h3>Draggable 2</h3>
        <Draggable
          class="list-group"
          :list="list2"
          group="people"
          item-key="name"
          @change="log"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              {{ element.name }} {{ index }}
            </div>
          </template>
        </Draggable>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>