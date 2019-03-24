<template>
  <Card shadow style="height: 100%;width: 100%;overflow:hidden">
    <div class="department-outer">
      <div class="tip-box">
        <b style="margin-right: 20px;">powered by <a target="blank" href="https://github.com/lison16">Lison</a></b>
        <a target="blank" href="https://github.com/lison16/v-org-tree" style="margin-right: 10px;">v-org-treedocument</a>
      </div>
      <div class="zoom-box">
        <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
      </div>
      <div class="view-box">
        <org-view
          v-if="data"
          :data="data"
          :zoom-handled="zoomHandled"
          @on-menu-click="handleMenuClick"
        ></org-view>
      </div>
    </div>
  </Card>
</template>

<script>
import OrgView from './components/org-view.vue'
import ZoomController from './components/zoom-controller.vue'
import { getOrgData } from '@/api/data'
import './index.less'
const menuDic = {
  edit: 'Editorial department',
  detail: 'Check the department',
  new: 'The new department',
  delete: 'Delete the department'
}
export default {
  name: 'org_tree_page',
  components: {
    OrgView,
    ZoomController
  },
  data () {
    return {
      data: null,
      zoom: 100
    }
  },
  computed: {
    zoomHandled () {
      return this.zoom / 100
    }
  },
  methods: {
    setDepartmentData (data) {
      data.isRoot = true
      return data
    },
    handleMenuClick ({ data, key }) {
      this.$Message.success({
        duration: 5,
        content: `Click on the "${data.label}" Node'${menuDic[key]}'menu`
      })
    },
    getDepartmentData () {
      getOrgData().then(res => {
        const { data } = res
        this.data = data
      })
    }
  },
  mounted () {
    this.getDepartmentData()
  }
}
</script>

<style>
</style>
