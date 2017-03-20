<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations('notification', ['setStatus'])
    },
    mounted () {
      this.setStatus('My Books')
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
