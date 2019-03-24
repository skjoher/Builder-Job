<template>
  <Card>
    <h3 style="padding: 10px 0;">Drag - the drawer components is the drawer of the iview components encapsulation, in support of the drawer, on the basis of all API support can be drag and footer at the bottom of the slot</h3>
    <div style="padding: 10px 0">
      <b>
        The direction of
        <i-switch v-model="placement">
          <span slot="open">On the left</span>
          <span slot="close">right</span>
        </i-switch>
      </b>
      <b>
        Could you drag
        <i-switch v-model="draggable"></i-switch>
      </b>
      <Button @click="showContainerBDrawer = !showContainerBDrawer" type="primary" style="margin-left: 10px">{{ showContainerBDrawer ? '关闭' : '打开' }}Container drawer</Button>
      <Button @click="showWindowBDrawer = true" type="primary" style="margin-left: 10px">Open the drawer full screen</Button>
    </div>
    <div class="drag-drawer-inner-box">
      <drag-drawer v-model="showContainerBDrawer"
        :width.sync="width2"
        min-width="30px"
        :inner="true"
        :transfer="false"
        :placement="placementComputed"
        :draggable="draggable"
        @on-resize="handleResize"
        :scrollable="true">
        <div slot="header">
          <Icon type="md-aperture" :size="18"></Icon>
          <b>This is a title</b>
        </div>
        <p v-for="n in 200" :key="n">{{ n }}</p>
        <div slot="footer">
          <p>123123</p>
          <p>21312</p>
        </div>
      </drag-drawer>
    </div>
    <drag-drawer v-model="showWindowBDrawer"
      :width.sync="width1"
      :min-width="300"
      :placement="placementComputed"
      :draggable="draggable"
      :scrollable="true">
      <div slot="header">
        <Icon type="md-aperture" :size="18"></Icon>
        <b>This is a title</b>
      </div>
      <Button @click="showBDrawer3 = true">According to multiple</Button>
      <p v-for="n in 200" :key="n">{{ n }}</p>
    </drag-drawer>
  </Card>
</template>

<script>
import DragDrawer from '_c/drag-drawer'
export default {
  name: 'drag_drawer_page',
  components: {
    DragDrawer
  },
  data () {
    return {
      showWindowBDrawer: false,
      showContainerBDrawer: false,
      showBDrawer3: false,
      width1: 300,
      width2: 200,
      placement: false,
      draggable: true
    }
  },
  computed: {
    placementComputed () {
      return this.placement ? 'left' : 'right'
    }
  },
  methods: {
    handleResize (event) {
      const { atMin } = event
      /* eslint-disable */
      console.log(atMin);
    },
  }
}
</script>

<style lang="less">
.drag-drawer-inner-box{
  position: relative;
  width: 500px;
  height: 400px;
  background: pink;
  border: 1px solid pink;
}
</style>
