<template>
  <div class="row">
    <div class="col-sm-offset-4 col-sm-4">

      <form @submit.prevent="validateBeforeSubmit">

          <div class="form-group" :class="{ 'has-error': $v.title.$error }">
            <label class="control-label" for="title">Title</label>
            <input id="title"
                   v-model.trim="title"
                   @input="$v.title.$touch()"
                   class="form-control" type="text" placeholder="Movie title">
            <p class="text-danger" v-show="$v.title.$error">{{ vmsgTitle }}</p>
          </div>

          <div class="form-group" :class="{ 'has-error': $v.year.$error }">
            <label class="control-label" for="year">Year</label>
            <input id="year"
                   v-model.trim="year"
                   @input="$v.year.$touch()"
                   class="form-control" type="text" placeholder="Production year">
            <p class="text-danger" v-show="$v.year.$error">{{ vmsgYear }}</p>
          </div>

          <div class="form-group">
            <label class="control-label" for="notes">Notes</label>
            <input id="notes"
                   v-model.trim="notes"
                   class="form-control" type="text" placeholder="Notes on movie">
          </div>

          <div class="form-group">
            <label class="control-label" for="imdbId">IMDB ID</label>
            <input id="imdbId"
                   v-model.trim="imdbId"
                   class="form-control" type="text" placeholder="IMDB index">
          </div>

          <div class="form-group" :class="{ 'has-error': $v.completed.$error }">
            <date-input id="completed"
                        v-model="completed"
                        @input="$v.completed.$touch()">
              <label class="control-label" for="completed">Completed on&nbsp;</label>
            </date-input>
          </div>

        <button type="submit" class="btn btn-default">Submit</button>
        &nbsp;
        <router-link to="../" append class="btn btn-default">Reject</router-link>
      </form>

    </div>
  </div>
</template>

<script>
  import vh, { movieTitle, year, completed } from '@/helpers/validators'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import DateInput from '@/components/DateInput'

  export default {
    components: { DateInput },
    props: ['id'],
    data () {
      return {
        title: '',
        year: '',
        notes: '',
        imdbId: '',
        completed: null
      }
    },
    validations: {
      title: vh.vrules(movieTitle),
      year: vh.vrules(year),
      completed: vh.vrules(completed)
    },
    computed: {
      ...mapGetters('items', ['item']),
      header () { return this.id ? 'Edit movie' : 'New movie' },
      vmsgTitle () { return vh.vmsg(this.$v.title, movieTitle) },
      vmsgYear () { return vh.vmsg(this.$v.year, year) }
    },
    methods: {
      ...mapMutations('notification', ['notify', 'setStatus']),
      ...mapActions('items', ['create', 'modify']),
      validateBeforeSubmit () {
        this.$v.$touch()
        if (this.$v.$invalid) return
        this.submitForm()
      },
      async submitForm () {
        if (this.id) {
          try {
            await this.modify({ item: { ...this.$data }, id: this.id })
            this.$router.push('/movies')
            this.notify({ msg: 'A movie has been modified :)', type: 'info' })
          } catch (e) {
            this.notify({ msg: 'Something went wrong when modifying a movie :(', type: 'danger' })
          }
        } else {
          try {
            await this.create({ ...this.$data })
            this.$router.push('/movies')
            this.notify({ msg: 'New movie has been added :)', type: 'info' })
          } catch (e) {
            this.notify({ msg: 'Something went wrong when adding new movie :(', type: 'danger' })
          }
        }
      }
    },
    created () {
      // New movie
      if (!this.id) return
      const movie = this.item(this.id)
      // A movie has not been selected for editing
      if (!movie) {
        this.$router.push('/movies')
        return
      }
      // Edit movie
      this.title = movie.title
      this.year = movie.year
      this.notes = movie.notes
      this.imdbId = movie.imdbId
      this.completed = movie.completed
    },
    mounted () {
      this.setStatus(this.header)
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
