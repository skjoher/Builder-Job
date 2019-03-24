<template>
  <Row :gutter="10">
    <i-col span="6">
      <Card>
        <Upload action="" :before-upload="beforeUpload">
          <Button icon="ios-cloud-upload-outline">Upload a CSV file</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;Click on the upload a CSV file
        </Upload>
        <p>Util. Js provides two methods to implement this feature:</p>
        <p class="update-table-intro"><Icon style="margin-right: 10px;" :size="10" type="md-heart"/><span class="code-high-line">getArrayFromFile</span>：To parse a Csv files into a two-dimensional array</p>
        <p class="update-table-intro"><Icon style="margin-right: 10px;" :size="10" type="md-heart"/><span class="code-high-line">getTableDataFromArray</span>：a two dimensional array to form data, specific please see the document</p>
      </Card>
    </i-col>
    <i-col span="18">
      <Table :height="500" :columns="columns" :data="tableData"/>
    </i-col>
  </Row>
</template>

<script>
import { getArrayFromFile, getTableDataFromArray } from '@/libs/util'
export default {
  name: 'update_table_page',
  data () {
    return {
      columns: [],
      tableData: []
    }
  },
  methods: {
    beforeUpload (file) {
      getArrayFromFile(file).then(data => {
        let { columns, tableData } = getTableDataFromArray(data)
        this.columns = columns
        this.tableData = tableData
      }).catch(() => {
        this.$Notice.warning({
          title: 'Can only upload a CSV file',
          desc: 'Can only upload a CSV file, please upload again'
        })
      })
      return false
    }
  }
}
</script>

<style>
.update-table-intro{
  margin-top: 10px;
}
.code-high-line{
  color: #2d8cf0;
}
</style>
