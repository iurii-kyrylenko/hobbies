<template>
  <canvas class="fcanvas"
          tabindex="-1"
          :width="state.width"
          :height="state.height">
  </canvas>
</template>

<script>
  /**
   * A 'read-only' component. Uses inner state.
   * The state is initialized from the props at the creation stage.
   */
  import mixins from './mixins'

  export default {
    mixins: [mixins],
    methods: {
      changeState (cb) {
        this.state = { ...this.state, ...cb(this.state) }
        this.draw()
        this.$emit('input', this.state)
      }
    },
    created () {
      this.state = { width: 300, height: 300, x: -0.5, y: 0, zoom: 100, ...this.value }
      this.getState = () => this.state
    }
  }
</script>

<style>
  @import './styles.css'
</style>
