<template>
  <div>
    设置属性
    <button @click="createDatabase">创建数据库</button>
  </div>
</template>

<script>
export default {
  name: "SetField",
  data() {
    return {
      dataBase: '',
    }
  },
  methods: {
    createDatabase() {
      const demoDatabase = window.indexedDB.open("toDoList", 4);
      demoDatabase.onerror = (event) => {
        console.log(event);
        this.$message.error('创建失败');
      };
      demoDatabase.onsuccess = (event) => {
        this.$message.success('创建成功');

        // store the result of opening the database in the db
        // variable. This is used a lot later on, for opening
        // transactions and suchlike.
        console.log(event);
        const db = demoDatabase.result;
        console.log(db);
      };
    }
  }
}
</script>

<style scoped>

</style>