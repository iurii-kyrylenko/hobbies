<template>
  <div class="row">
      <div class="col-sm-4">
        <form @submit.prevent="">
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
      </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    methods: {
      ...mapMutations('notification', ['setStatus'])
    },
    mounted () {
      this.setStatus('My Settings')
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
