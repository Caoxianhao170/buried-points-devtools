<template>
  <div>
    <div>
      <span>上传埋点文件：</span>
      <a-upload-dragger
          :customRequest="excelTransformArray"
          name="file"
      >
        <a-button> <a-icon type="upload" /> Upload </a-button>
      </a-upload-dragger>
    </div>
    <a-table :columns="tableColumns" :data-source="dataSource">
    </a-table>
  </div>
</template>

<script>
// 导入SheetJS库
import {utils, read} from 'xlsx';
export default {
  name: "TestTracker",
  data() {
    return {
      dataSource: [
      ],
      tableColumns: [
        {
          title: 'Id',
          key: 'id',
          dataIndex: 'id',
        },
        {
          title: 'status',
          key: 'status',
          dataIndex: 'status',
        },
        {
          title: 'errorMessage',
          key: 'errorMessage',
          dataIndex: 'errorMessage',
        },
      ],
      isHasError: false,
      errorMsg: '',
    }
  },
  mounted() {
    this.testTracker();
  },
  methods: {
    excelTransformArray(info) {
      const file = info.file;
      const fileReader = new FileReader();
      fileReader.onload = event => {
        try {
          const {result} = event.target;
          const workbook = read(result, {type: 'binary'});
          console.log(workbook);
          for (const sheet in workbook.Sheets) {
            const data = utils.sheet_to_json(workbook.Sheets[sheet]);
            console.log(data);
            this.dataSource = data
            console.log(this.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
      fileReader.readAsBinaryString(file);
    },
    testTracker() {
      window.chrome.runtime.onMessage.addListener(message => {
        if (message.type === 'tracker' && message.to === 'iframe') {
          const obj = message.obj;
          this.dataSource.forEach(item => {
            if (item.id === obj.id) {
              Object.keys(item).forEach(subItem => {
                if (obj[subItem] === item[subItem]) {
                  this.isHasError = false;
                  this.errorMsg = '';
                } else {
                  this.isHasError = true;
                  this.errorMsg = `${subItem}有问题`;
                  console.log('有错误');
                  return;
                }
              });
              item.status = this.isHasError;
              item.errorMessage = this.errorMsg;
              console.log('@@@dataSource',this.dataSource);
            } else {
              return;
            }
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>