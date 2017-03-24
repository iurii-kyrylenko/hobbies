<template>
  <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <form @submit.prevent="submitSettings">
          <div class="form-group">
            <div class="checkbox form-control">
              <label>
                <input ref="shareBooks" type="checkbox" :checked="settings.shareBooks">
                Share Books
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="checkbox form-control">
              <label>
                <input ref="shareMovies" type="checkbox" :checked="settings.shareMovies">
                Share Movies
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
      </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    methods: {
      ...mapMutations('notification', ['setStatus', 'notify']),
      ...mapActions('users', ['getSettings', 'saveSettings']),
      async submitSettings () {
        try {
          await this.saveSettings({
            shareBooks: this.$refs.shareBooks.checked,
            shareMovies: this.$refs.shareMovies.checked
          })
          this.notify({ msg: 'Your settings have been saved :)', type: 'info' })
        } catch (e) {
          this.notify({ msg: 'Something went wrong when saving settings :(', type: 'danger' })
          this.getSettings()
        }
      }
    },
    computed: {
      ...mapGetters('users', ['settings'])
    },
    mounted () {
      this.setStatus('My settings')
      this.getSettings()
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
