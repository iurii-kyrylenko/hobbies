<template>
  <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <form @submit.prevent="">
          <div class="form-group">
            <div class="checkbox form-control">
              <label><input type="checkbox" value="">Share Books</label>
            </div>
          </div>
          <div class="form-group">
            <div class="checkbox form-control">
              <label><input type="checkbox" value="">Share Movies</label>
            </div>
          </div>
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
