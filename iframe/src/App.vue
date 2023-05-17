<template>
  <div id="app">
    <a-tabs>
      <a-tab-pane tab="测试埋点" key="1">
        <test-tracker/>
      </a-tab-pane>
      <a-tab-pane tab="查看埋点" key="2">
        <show-tracker />
      </a-tab-pane>
      <a-tab-pane tab="设置" key="3">
        <set-field />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import TestTracker from './components/TestTracker.vue';
import ShowTracker from './components/ShowTracker.vue';
import SetField from './components/SetField.vue';


export default {
  name: 'App',
  components: {
    TestTracker,
    ShowTracker,
    SetField
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
