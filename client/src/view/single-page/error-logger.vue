<template>
  <div>
    <Button @click="exportData" type="primary" style="margin: 0 10px 10px 0;">Export logging</Button>
    <b>Note: this will only show successfully saved to the server error log, and page error log will not persistent storage in the browser, refresh the page that will be lost</b>
    <Table ref="table" :columns="columns" :data="errorList"></Table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapMutations } from 'vuex'
export default {
  name: 'error_logger_page',
  data () {
    return {
      columns: [
        {
          type: 'index',
          title: 'The serial number',
          width: 100
        },
        {
          key: 'type',
          title: 'type',
          width: 100,
          render: (h, { row }) => {
            return (
              <div>
                <icon size={16} type={row.type === 'ajax' ? 'md-link' : 'md-code-working'}></icon>
              </div>
            )
          }
        },
        {
          key: 'code',
          title: 'coding',
          render: (h, { row }) => {
            return (
              <span>{ row.code === 0 ? '-' : row.code }</span>
            )
          }
        },
        {
          key: 'mes',
          title: 'information'
        },
        {
          key: 'url',
          title: 'URL'
        },
        {
          key: 'time',
          title: 'time',
          render: (h, { row }) => {
            return (
              <span>{ dayjs(row.time).format('YYYY-MM-DD HH:mm:ss') }</span>
            )
          },
          sortable: true,
          sortType: 'desc'
        }
      ]
    }
  },
  computed: {
    errorList () {
      return this.$store.state.app.errorList
    }
  },
  methods: {
    ...mapMutations([
      'setHasReadErrorLoggerStatus'
    ]),
    exportData () {
      this.$refs.table.exportCsv({
        filename: 'The error log.csv'
      })
    }
  },
  activated () {
    this.setHasReadErrorLoggerStatus()
  },
  mounted () {
    this.setHasReadErrorLoggerStatus()
  }
}
</script>

<style>

</style>
