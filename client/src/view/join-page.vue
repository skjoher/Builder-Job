<template>
  <div>
    <Row :gutter="20">
      <i-col span="12">
        <Card title="admin" shadow>
          <img class="qq-group-img" :src="qqFans" alt="">
          <p class="qq-group-intro">This group of iview - admin or for use on iview - admin interested developers to provide a communication platform, here, to solve the confusion in your development and common progress.</p>
        </Card>
      </i-col>
      <i-col span="12">
        <Card title="admin" shadow>
          <img class="qq-group-img" :src="qqFans2" alt="">
          <p class="qq-group-intro">This group of iview - admin or for use on iview - admin interested developers to provide a communication platform, here, to solve the confusion in your development and common progress. </p>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import qqFans from '@/assets/images/qq-group1.jpg'
import qqFans2 from '@/assets/images/qq-group2.jpg'
export default {
  name: 'join_page',
  data () {
    return {
      qqFans,
      qqFans2
    }
  }
}
</script>

<style>
.qq-group-img{
  display: block;
  margin: 0 auto;
  width: 240px;
}
.qq-group-intro{
  padding: 20px;
  font-size: 16px;
}
</style>
