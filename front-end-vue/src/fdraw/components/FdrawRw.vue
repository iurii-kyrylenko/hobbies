<template>
  <canvas class="fcanvas"
          tabindex="-1"
          :width="value.width"
          :height="value.height">
  </canvas>
</template>

<script>
  /**
   * A 'read-write' component. Uses external state.
   * The state is read from the props.
   * Parent component modifies the state.
   */
  import mixins from './mixins'

  export default {
    mixins: [mixins],
    methods: {
      changeState (cb) {
        const newValue = { ...this.$props.value, ...cb(this.$props.value) }
        this.$emit('input', newValue)
      }
    },
    watch: {
      value (value) {
        this.$nextTick(() => this.draw())
      }
    },
    created () {
      this.getState = () => this.$props.value
    }
  }
</script>

<style>
  @import './styles.css'
</style>
