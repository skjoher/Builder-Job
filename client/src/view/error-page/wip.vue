<template>

  <error-content :src="src"/>

</template>

<script>
import wip from '@/assets/images/error-page/wip.png'
import errorContent from './error-content.vue'
export default {
  name: 'wip',
  components: {
    errorContent
  },
  data () {
    return {
      src: wip
    }
  }
}
</script>
