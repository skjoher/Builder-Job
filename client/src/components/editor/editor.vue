<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * type of the value of the binding, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /**
     * @description Set the change event triggering time interval
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description Whether to open the local store
     */
    cache: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.editorId}`)
    this.editor.customConfig.onchange = (html) => {
      let text = this.editor.txt.text()
      if (this.cache) localStorage.editorCache = html
      this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html, text)
    }
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    // Create the method must be called after all the configuration items
    this.editor.create()
    // If the local storage load local store content
    let html = this.value || localStorage.editorCache
    if (html) this.editor.txt.html(html)
  }
}
</script>

<style lang="less">
.editor-wrapper *{
  z-index: 100 !important;
}
</style>
