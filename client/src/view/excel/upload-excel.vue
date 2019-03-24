<style lang="less">
  @import "./common.less";
</style>
<template>
  <div>
    <Card title="Import EXCEL">
      <Row>
        <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
          <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">Upload a file</Button>
        </Upload>
      </Row>
      <Row>
        <div class="ivu-upload-list-file" v-if="file !== null">
          <Icon type="ios-stats"></Icon>
            {{ file.name }}
          <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
        </div>
      </Row>
      <Row>
        <transition name="fade">
          <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
            <div v-if="progressPercent == 100">
              <Icon type="ios-checkmark-circle"></Icon>
              <span>successful</span>
            </div>
          </Progress>
        </transition>
      </Row>
    </Card>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
    </Row>
  </div>
</template>
<script>
import excel from '@/libs/excel'
export default {
  name: 'upload-excel',
  data () {
    return {
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false
    }
  },
  methods: {
    initUpload () {
      this.file = null
      this.showProgress = false
      this.loadingProgress = 0
      this.tableData = []
      this.tableTitle = []
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleRemove () {
      this.initUpload()
      this.$Message.info('Upload the file has been deleted!')
    },
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$Notice.warning({
          title: 'file type error',
          desc: 'File:' + file.name + 'Not EXCEL file, please select the suffix for. XLSX or. XLS EXCEL file.'
        })
      }
      return false
    },
    // Read the file
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
        this.tableLoading = true
        this.showProgress = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round(e.loaded / e.total * 100)
      }
      reader.onerror = e => {
        this.$Message.error('File read error')
      }
      reader.onload = e => {
        this.$Message.info('File read successful')
        const data = e.target.result
        const { header, results } = excel.read(data, 'array')
        const tableTitle = header.map(item => { return { title: item, key: item } })
        this.tableData = results
        this.tableTitle = tableTitle
        this.uploadLoading = false
        this.tableLoading = false
        this.showRemoveFile = true
      }
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
