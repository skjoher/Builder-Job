<template>
  <div class="paste-editor-wrapper">
    <textarea ref="codemirror" class="textarea-el"></textarea>
  </div>
</template>
<script>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import { forEach } from '@/libs/tools'
import createPlaceholder from './plugins/placeholder'
export default {
  name: 'PasteEditor',
  props: {
    value: Array,
    pasteData: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Data from the web or other application software copy form, paste it to here.By default, the first line is header using the enter key to add a new line, using the Tab key to distinguish between columns。'
    }
  },
  data () {
    return {
      pasteDataArr: [],
      rowArrLength: 0,
      editor: null
    }
  },
  watch: {
    pasteData (val) {
      if (val === '') {
        this.editor.setValue('')
      }
    }
  },
  computed: {
    rowNum () {
      return this.pasteDataArr.length
    },
    colNum () {
      return this.pasteDataArr[0] ? this.pasteDataArr[0].length : 0
    }
  },
  methods: {
    handleKeyup (e) {
      this.handleAreaData()
    },
    /**
     * @description Handling the paste
     */
    handleContentChanged (content) {
      let pasteData = content.trim()
      this.$emit('on-content-change', pasteData)
      let rows = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      })
      if (content === '') rows = []
      this.pasteDataArr = rows
      this.clearLineClass()
      this.checkColNumInEveryRow()
      this.$emit('input', this.pasteDataArr)
    },
    /**
     * @description Check whether in addition to the first line of each category of the same as the first line
     */
    checkColNumInEveryRow () {
      let i = 0
      const len = this.rowNum
      if (len === 0) return
      while (++i < len) {
        let item = this.pasteDataArr[i]
        if (item.length !== this.colNum && (!(i === len - 1 && item.length === 1 && item[0] === '') || i !== len - 1)) {
          this.markIncorrectRow(i)
          this.$emit('on-error', i)
          return false
        }
      }
      this.$emit('on-success', this.pasteDataArr)
      return true
    },
    /**
     * @description Mark is not in conformity with the format of a line
     */
    markIncorrectRow (index) {
      this.editor.addLineClass(index, 'text', 'incorrect-row')
    },
    /**
     * @description Mark is not in conformity with the format of a line
     */
    clearLineClass () {
      forEach(this.pasteDataArr, (item, index) => {
        this.editor.removeLineClass(index, 'text', 'incorrect-row')
      })
    }
  },
  mounted () {
    createPlaceholder(CodeMirror)
    this.editor = CodeMirror.fromTextArea(this.$refs.codemirror, {
      lineNumbers: true,
      tabSize: 1,
      lineWrapping: true,
      placeholder: this.placeholder
    })
    this.editor.on('change', (editor) => {
      this.handleContentChanged(editor.getValue())
    })
    this.editor.addLineClass(0, 'text', 'first-row')
  }
}
</script>
<style lang="less">
@import './paste-editor.less';
</style>
