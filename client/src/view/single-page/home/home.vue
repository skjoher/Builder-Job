<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="User access to source"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="Active users every week"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: 'User', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: 'click', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: 'Q&A', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: 'Share count', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: 'Interactive', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: 'Page', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: 'Direct access to the' },
        { value: 310, name: 'Email marketing' },
        { value: 234, name: 'Union advertising' },
        { value: 135, name: 'Video advertising' },
        { value: 1548, name: 'Search engine' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
