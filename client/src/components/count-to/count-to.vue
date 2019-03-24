<template>
  <div class="count-to-wrapper">
    <slot name="left"/>
    <p class="content-outer"><span :class="['count-to-count-text', countClass]" :id="counterId">{{ init }}</span><i :class="['count-to-unit-text', unitClass]">{{ unitText }}</i></p>
    <slot name="right"/>
  </div>
</template>

<script>
import CountUp from 'countup'
import './index.less'
export default {
  name: 'CountTo',
  props: {
    init: {
      type: Number,
      default: 0
    },
    /**
     * @description The starting value, that is, before the start of the animation display
     */
    startVal: {
      type: Number,
      default: 0
    },
    /**
     * @description After the end value, at the end of the animation display
     */
    end: {
      type: Number,
      required: true
    },
    /**
     * @description Keep a few decimal places
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     * @description To separate integer and decimal symbols, the default is the decimal point
     */
    decimal: {
      type: String,
      default: '.'
    },
    /**
     * @description The duration of the animation, the unit is second
     */
    duration: {
      type: Number,
      default: 2
    },
    /**
     * @description The starting time of the delay, the unit is second
     */
    delay: {
      type: Number,
      default: 0
    },
    /**
     * @description Whether to disable much the animation effects
     */
    uneasing: {
      type: Boolean,
      default: false
    },
    /**
     * @description Whether to use groups, each group three will use a symbolic space
     */
    usegroup: {
      type: Boolean,
      default: false
    },
    /**
     * @description Symbols are used to group (usegroup)
     */
    separator: {
      type: String,
      default: ','
    },
    /**
     * @description Whether, according to a simplified set to true after a unit unit is used to do related to omit
     */
    simplify: {
      type: Boolean,
      default: false
    },
    /**
    * @description custom units, such as [3, 'K +], [6,' M + '] less than 6 digit is greater than 3 digits with K + omitted
    * 1000 is shown as 1 k +
     */
    unit: {
      type: Array,
      default () {
        return [[3, 'K+'], [6, 'M+'], [9, 'B+']]
      }
    },
    countClass: {
      type: String,
      default: ''
    },
    unitClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      counter: null,
      unitText: ''
    }
  },
  computed: {
    counterId () {
      return `count_to_${this._uid}`
    }
  },
  methods: {
    getHandleVal (val, len) {
      return {
        endVal: parseInt(val / Math.pow(10, this.unit[len - 1][0])),
        unitText: this.unit[len - 1][1]
      }
    },
    transformValue (val) {
      let len = this.unit.length
      let res = {
        endVal: 0,
        unitText: ''
      }
      if (val < Math.pow(10, this.unit[0][0])) res.endVal = val
      else {
        for (let i = 1; i < len; i++) {
          if (val >= Math.pow(10, this.unit[i - 1][0]) && val < Math.pow(10, this.unit[i][0])) res = this.getHandleVal(val, i)
        }
      }
      if (val > Math.pow(10, this.unit[len - 1][0])) res = this.getHandleVal(val, len)
      return res
    },
    getValue (val) {
      let res = 0
      if (this.simplify) {
        let { endVal, unitText } = this.transformValue(val)
        this.unitText = unitText
        res = endVal
      } else {
        res = val
      }
      return res
    }
  },
  mounted () {
    this.$nextTick(() => {
      let endVal = this.getValue(this.end)
      this.counter = new CountUp(this.counterId, this.startVal, endVal, this.decimals, this.duration, {
        useEasing: !this.uneasing,
        useGrouping: this.useGroup,
        separator: this.separator,
        decimal: this.decimal
      })
      setTimeout(() => {
        if (!this.counter.error) this.counter.start()
      }, this.delay)
    })
  },
  watch: {
    end (newVal) {
      let endVal = this.getValue(newVal)
      this.counter.update(endVal)
    }
  }
}
</script>
