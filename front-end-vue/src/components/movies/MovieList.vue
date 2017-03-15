<template>
  <div>
    <item-list ref="itemList"
               selector="movies"
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
              <tr v-for="movie in movies">
                <td>
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
  import { mapGetters } from 'vuex'

  export default {
    components: { ItemList },
    computed: {
      ...mapGetters('items', ['movies'])
    },
    methods: {
      remove (movie) {
        this.$refs.itemList.openConfirm(movie)
      }
    }
  }
</script>
