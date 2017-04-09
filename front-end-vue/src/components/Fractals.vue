<template>
  <div>
    <fdraw-r :value="{ width: 320, height: 440 }"></fdraw-r>

    <div class="fpanel">
      <input :value="params.width" @input="pushToImmutable('width', $event)" title="Width">
      <span>&times;</span>
      <input :value="params.height" @input="pushToImmutable('height', $event)" title="Height">
      <a @click="zoom(true)" title="Zoom In">+</a>
      <a @click="zoom(false)" title="Zoom Out">-</a>
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
        msg: `To move, drag with the mouse or one finger.
              To zoom in/out, press + - or pinch with two fingers.`,
        type: 'info' })
    },
    data: () => ({
      params: {
        width: 800,
        height: 300,
        x: -1.2627977301623445,
        y: 0.03909461192195192,
        zoom: 2487899762
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
      zoom (dir) {
        const zoom = dir ? this.params.zoom * 1.5 : this.params.zoom / 1.5
        this.params = { ...this.params, zoom }
      },
      progress (event) {
        this.drawing = event ? 'Drawing...' : ''
      }
    }
  }
</script>

<style scoped>
  .fpanel {
    margin-top: 16px;
    margin-bottom: 12px;
    width: 240px;
    height: 80px;
    background-color: #f8f8f8;
    border: 1px solid #C2C2C2;
    box-shadow: 1px 1px 4px #EBEBEB;
    border-radius: 3px;
    padding: 2px;
  }
  .fpanel > input {
    margin: 2px;
    width: 34px;
    font-size: 8pt;
    outline: none;
    padding: 2px;
    border: solid 2px #eee;
    border-radius: 8px;
    text-align: center;
  }
  .fpanel > a {
    text-decoration: none;
    background-color: #fff;
    color: #000;
    cursor: default;
    width: 20px;
    height: 20px;
    margin: 2px;
    display: inline-block;
    text-align: center;
    font-size: 8pt;
    border: solid 2px #eee;
    border-radius: 10px;
  }
  .fpanel > a:hover {
    background-color: #eee
  }
  .fpanel > .info {
    margin-left: 8px;
    font-family:Courier New;
    font-size: 8pt;
  }
</style>
