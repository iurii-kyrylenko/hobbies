<template>
  <fdraw-r :value="{ width: 320, height: 440 }"></fdraw-r>
</template>

<script>
  import FdrawR from '@/fdraw/components/FdrawR'
  export default {
    components: { FdrawR },
    mounted () {
      this.$store.commit('notification/notify', {
        msg: `To move, drag with the mouse or one finger.
              To zoom in/out, press + - or pinch with two fingers.`,
        type: 'info' })
    }
  }
</script>
