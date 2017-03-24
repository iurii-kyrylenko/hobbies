<template>
  <div>
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
              <th v-if="my" style="width: 10%"></th>
              <th style="width: 15%">Completed</th>
              <th style="width: 10%">Year</th>
              <th style="width: 40%">Title</th>
              <th>Notes</th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="movie in items">
                <td v-if="my">
                  <div class="input-group-btn">
                      <router-link :to="movie._id" append class="btn btn-default" title="Edit Movie">
                        <i class="glyphicon glyphicon-pencil"></i>
                      </router-link>
                      <a @click="remove(movie)" class="btn btn-default" title="Remove Movie">
                        <i class="glyphicon glyphicon-remove"></i>
                      </a>
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
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    props: ['uid', 'name'],
    components: { ItemList },
    computed: {
      ...mapGetters('items', ['my', 'items'])
    },
    methods: {
      ...mapMutations('items', ['select']),
      ...mapMutations('notification', ['setStatus']),
      remove (movie) {
        this.$refs.itemList.openConfirm(movie)
      }
    },
    created () {
      this.select({ hobby: 'movies', uid: this.uid })
      if (!this.my) this.setStatus(`${this.name}'s movies`)
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
