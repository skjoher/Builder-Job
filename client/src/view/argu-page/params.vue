<template>
  <div>
    <Card>
      <h2>ID: {{ $route.params.id }}</h2>
      <Button @click="close">Call closeTag method to close this page</Button>
    </Card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'params',
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    close () {
      /**
       * If is call closeTag method, common page of the incoming object parameters you just need to write the name field
       * If it is a dynamic routing and routing, need to query or the params field, is used to distinguish closed parameters for how many pages
       */
      this.closeTag({
        name: 'params',
        params: {
          id: this.$route.params.id
        }
      })
    }
  }
}
</script>

<style>

</style>
