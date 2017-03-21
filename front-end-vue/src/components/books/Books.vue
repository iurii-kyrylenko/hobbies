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
      this.select({ hobby: 'books' })
    },
    mounted () {
      this.setStatus('My Books')
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
