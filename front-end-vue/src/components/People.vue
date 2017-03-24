<template>
  <div class="row">
    <div class="col-sm-6">

      <div class="my-search input-group">
        <input type="text" class="form-control"
               ref="search"
               placeholder="Search people"
               :value="filter"
               @keyup.enter="applySearch"
               @keyup.esc="clearSearch">
        <div class="input-group-btn">

          <a @click="applySearch" class="btn btn-default" title="Apply Search Filter">
            <i class="glyphicon glyphicon-search"></i>
          </a>

          <a @click="clearSearch" class="btn btn-default" title="Clear Search Filter">
            <i class="glyphicon glyphicon-remove-sign"></i>
          </a>
        </div>
      </div>

      <div v-if="users.length" class="panel panel-default">
        <div class="table-responsive">
          <table class="table table-striped">
            <tbody>
              <tr v-for="user in users">
                <td>
                  <i class="glyphicon glyphicon-user"></i>
                  {{ user.name }}
                </td>
                <td>
                  <router-link v-if="user.shareBooks" class="btn btn-default" :to="user.tob" append>
                    <i class="glyphicon glyphicon-book"></i>
                    {{ user.name + '\'s books' }}
                  </router-link>
                </td>
                <td>
                  <router-link v-if="user.shareMovies" class="btn btn-default" :to="user.tom" append>
                    <i class="glyphicon glyphicon-film"></i>
                    {{ user.name + '\'s movies' }}
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <pager :frame="8"
             :pageCount="pageCount"
             :page="page"
             @change="changePage">
      </pager>


    </div>
  </div>
</template>

<script>
  import Pager from './Pager'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: { Pager },
    computed: {
      ...mapGetters('users', ['users', 'pageCount', 'page', 'filter'])
    },
    methods: {
      ...mapActions('users', ['getUsers', 'changePage', 'applyFilter']),
      applySearch () {
        this.applyFilter(this.$refs.search.value.trim())
      },
      clearSearch () {
        this.applyFilter('')
      }
    },
    mounted () {
      this.getUsers()
    }
  }
</script>
