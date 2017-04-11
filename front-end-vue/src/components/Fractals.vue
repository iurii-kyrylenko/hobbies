<template>
  <div>
    <div class="fpanel">
      <input :value="params.width" @input="pushToImmutable('width', $event)" title="Width">
      <span>&times;</span>
      <input :value="params.height" @input="pushToImmutable('height', $event)" title="Height">
      <span class="info"><b>{{ drawing }}</b></span>
      <div class="info">x:&nbsp;&nbsp;&nbsp;&nbsp;{{ params.x }}</div>
      <div class="info">y:&nbsp;&nbsp;&nbsp;&nbsp;{{ params.y}}</div>
      <div class="info">zoom: {{ params.zoom }}</div>
    </div>

    <fdraw-rw v-model="params" @progress="progress"></fdraw-rw>
  </div>
</template>

<script>
  import FdrawR from '@/fdraw/components/FdrawR'
  import FdrawRw from '@/fdraw/components/FdrawRw'
  export default {
    components: { FdrawR, FdrawRw },
    mounted () {
      this.$store.commit('notification/notify', {
        msg: `Move: drag with the mouse or one finger.
              Zoom in/out: press + - or pinch with two fingers.`,
        type: 'info' })
    },
    data: () => ({
      params: {
        width: 320,
        height: 440,
        x: -0.5,
        y: 0,
        zoom: 150
      },
      drawing: ''
    }),
    methods: {
      pushToImmutable (key, event) {
        const n = +event.target.value
        if (!isNaN(n) && n > 0) {
          this.params = { ...this.params, [key]: n }
        }
      },
      progress (event) {
        this.drawing = event ? 'Drawing...' : ''
      }
    }
  }
</script>

<style scoped>
  .fpanel {
    margin-bottom: 12px;
    width: 325px;
    height: 90px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 4px #eee;
    border-radius: 3px;
    padding: 2px;
  }
  .fpanel > input {
    margin: 4px;
    width: 40px;
    padding: 2px;
    text-align: center;
  }
  .fpanel > .info {
    margin-left: 16px;
    font-family: Courier New;
    font-size: 0.8em;
  }
</style>
