<template>
  <div>
    <editor ref="editor" :value="content" @on-change="handleChange"/>
    <Button @click="changeContent">Modify the editor content</Button>
  </div>
</template>

<script>
import Editor from '_c/editor'
export default {
  name: 'editor_page',
  components: {
    Editor
  },
  data () {
    return {
      content: '12312323'
    }
  },
  methods: {
    handleChange (html, text) {
      console.log(html, text)
    },
    changeContent () {
      this.$refs.editor.setHtml('<p>powered by wangeditor</p>')
    }
  }
}
</script>

<style>

</style>
