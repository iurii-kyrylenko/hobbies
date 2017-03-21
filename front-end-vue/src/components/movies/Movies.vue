<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations('items', ['select']),
      ...mapMutations('notification', ['setStatus'])
    },
    created () {
      this.select({ hobby: 'movies' })
    },
    mounted () {
      this.setStatus('My Movies')
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
