<template>
  <Row>
    <i-col span="16">
      <Row v-for="i in (customIconList.length / 3)" :key="`custom-icon-row-${i}`">
        <i-col span="8" v-for="item in customIconList.slice((i - 1) * 3, i * 3)" :key="`custom-icon-${item}`">
          <Card style="margin: 0 5px 5px; text-align: center;">
            <icons :size="30" :type="item"/>
            <p class="icon-code">&lt;Icons :size="30" type="{{ item }}"&gt;</p>
            <p>&lt;CommonIcon :size="30" type="_{{ item }}"&gt;</p>
          </Card>
        </i-col>
      </Row>
      <Row>
        <i-col>
          <Card style="margin: 0 5px 5px; text-align: center;">
            <common-icon :size="30" type="ionic"/>
            <p class="icon-code">IView built-in ICONS</p>
            <p>&lt;CommonIcon :size="30" type="ionic"&gt;</p>
          </Card>
        </i-col>
      </Row>
    </i-col>
    <i-col span="8">
      <Card>
        <p class="intro-p"><Icon style="margin-right: 10px;" :size="10" type="heart"/>The Icons components support custom Icons, according to the specific custom icon font file please refer to the document.</p>
        <p class="intro-p"><Icon style="margin-right: 10px;" :size="10" type="heart"/>CommonIcon components at the same time support the iView built-in types and custom icon icon type, in order to distinguish the two types, the need to underline in front of the name of a custom icon "_"</p>
      </Card>
    </i-col>
  </Row>
</template>

<script>
import Icons from '_c/icons'
import CommonIcon from '_c/common-icon'
export default {
  name: 'icons_pages',
  components: {
    Icons,
    CommonIcon
  },
  data () {
    return {
      customIconList: [
        'woman',
        'man',
        'smile',
        'meh',
        'frown',
        'bear'
      ]
    }
  }
}
</script>

<style lang="less">
.icon-code{
  margin: 20px 0 10px;
}
.intro-p{
  margin-bottom: 10px;
}
</style>
