<template>
  <div>
    <Card>
      <h2>ID: {{ $route.query.id }}</h2>
      <Button @click="close">Call closeTag method to close this page</Button>
    </Card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'query',
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    close () {
      /**
* if it is call closeTag method, common page of the incoming object parameters you just need to write the name field
* if it is a dynamic routing and routing, need to query or the params field, is used to distinguish closed parameters for how many pages
       */
      this.closeTag({
        name: 'query',
        query: {
          id: this.$route.query.id
        }
      })
    }
  }
}
</script>

<style>

</style>
