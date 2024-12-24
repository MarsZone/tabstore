<script>
  export default {
    name: 'RenameDialog',
    emits: ['submit-new-name'],
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          // region: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      openDialog() {
        this.dialogFormVisible = true;
      },
      closeDialog() {
        this.dialogFormVisible = false;
      },
      submitNewName() {
        this.$emit('submit-new-name', this.form.name);
        this.dialogFormVisible = false;
        this.form.name = '';
      }
    }
  };
  </script>
  
<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="Category name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="submitNewName">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
  
  <style scoped>
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
  
  </style>
  