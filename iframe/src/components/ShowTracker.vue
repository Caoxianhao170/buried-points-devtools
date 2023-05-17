<template>
  <div>
    <div v-for="(item, index) in trackerData" :key="index" class="tracker-container">
      <a-tooltip :placement="top" trigger="click" overlayClassName="ant-tooltip-inner">
        <div slot="title">
          <vue-json-pretty :data="item"></vue-json-pretty>
        </div>
        <div class="tracker-id">
          <a-icon type="caret-right" />{{item.id}}
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
export default {
  name: "ShowTracker",
  components: {
    VueJsonPretty
  },
  data() {
    return {
      trackerData: [],
      message: '',
      sender: '',
      sendResponse: '',
      text: 'ant-tooltip-inner'
    }
  },
  mounted() {
    this.startListen();
    this.listenHeight();
  },
  methods: {
    startListen() {
      window.chrome.runtime.onMessage.addListener(message => {
        if (message.type === 'tracker' && message.to === 'iframe') {
          const obj = message.obj;
          this.trackerData.push(obj);
        }
      });
    },
    listenHeight() {
      // 创建一个 MutationObserver 实例
      const observer = new MutationObserver(function(mutations) {
        // 遍历每个变化
        mutations.forEach(function(mutation) {
          // 检查是否是 DOM 结构变化
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            // 滑动到页面底部
            window.scrollTo(0, document.body.scrollHeight);
          }
        });
      });

// 配置 MutationObserver 监听DOM的变化
      const observerConfig = { attributes: true, childList: true, subtree: true };
      observer.observe(document.body, observerConfig);
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
  }
}
</script>

<style scoped>
.tracker-container {
  margin: 10px 0;
  padding: 0 10px;
  text-align: left;
  border-bottom: 1px solid gainsboro;
}
.ant-tooltip-inner {
  width: 350px;
}
</style>