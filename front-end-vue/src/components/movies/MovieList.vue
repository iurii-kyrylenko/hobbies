<template>
  <div>

    <modal ref="info">
      <div slot="header"><h4>{{ movieTitle }}</h4></div>
      <div slot="body">
        {{ info }}
      </div>
      <div slot="footer">
        <button class="btn btn-default" @click="closeInfo">OK</button>
      </div>
    </modal>

    <item-list ref="itemList"
               searchPlaceholder="Search for movie title, year of production or notes"
               addPrompt="Add Movie"
               removeHeader="Removing Movie"
               downloadPrompt="Download Movies"
               uploadPrompt="Upload Movies">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th style="width: 10%"></th>
              <th style="width: 15%">Completed</th>
              <th style="width: 10%">Year</th>
              <th style="width: 40%">Title</th>
              <th>Notes</th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="movie in items">
                <td>
                  <div class="input-group-btn">
                      <a @click="openInfo(movie)" class="btn btn-default" title="Movie Info">
                        <i class="glyphicon glyphicon-info-sign"></i>
                      </a>
                      <template v-if="my">
                        <router-link :to="movie._id" append class="btn btn-default" title="Edit Movie">
                          <i class="glyphicon glyphicon-pencil"></i>
                        </router-link>
                        <a @click="remove(movie)" class="btn btn-default" title="Remove Movie">
                          <i class="glyphicon glyphicon-remove"></i>
                        </a>
                      </template>
                  </div>
                </td>
                <td>{{ movie.completed | date }}</td>
                <td>{{ movie.year }}</td>
                <td>{{ movie.title }}</td>
                <td>{{ movie.notes }}</td>
              </tr>
            </tbody>
        </table>
      </div>
    </item-list>
  </div>
</template>

<script>
  import ItemList from '../ItemList'
  import Modal from '../Modal'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    props: ['uid', 'name'],
    components: { ItemList, Modal },
    computed: {
      ...mapGetters('items', ['my', 'items'])
    },
    data: () => ({
      movieTitle: '',
      info: ''
    }),
    methods: {
      ...mapMutations('items', ['select']),
      ...mapMutations('notification', ['setStatus']),
      remove (movie) {
        this.$refs.itemList.openConfirm(movie)
      },
      openInfo (movie) {
        this.movieTitle = movie.title
        this.$refs.info.open()
        // This is the modeling code. An async action will be used instead.
        this.info = 'Loading...'
        setTimeout(() => { this.info = '-- INFORMATION --' }, 1000)
      },
      closeInfo () {
        this.$refs.info.close(false)
      }
    },
    created () {
      this.select({ hobby: 'movies', uid: this.uid })
    },
    mounted () {
      const status = this.my ? 'My movies' : `${this.name}'s movies`
      this.setStatus(status)
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
