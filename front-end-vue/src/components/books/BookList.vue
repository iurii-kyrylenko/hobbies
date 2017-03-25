<template>
  <div>
    <item-list ref="itemList"
               searchPlaceholder="Search for book title or author"
               addPrompt="Add Book"
               removeHeader="Removing Book"
               downloadPrompt="Download Books"
               uploadPrompt="Upload Books">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th v-if="my" style="width: 10%"></th>
              <th style="width: 15%">Completed</th>
              <th style="width: 8%">Mode</th>
              <th style="width: 25%">Author</th>
              <th>Title</th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="book in items">
                <td v-if="my">
                  <div class="input-group-btn">
                      <router-link :to="book._id" append class="btn btn-default" title="Edit Book">
                        <i class="glyphicon glyphicon-pencil"></i>
                      </router-link>
                      <a @click="remove(book)" class="btn btn-default" title="Remove Book">
                        <i class="glyphicon glyphicon-remove"></i>
                      </a>
                  </div>
                </td>
                <td>{{ book.completed | date }}</td>
                <td>{{ book.mode }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.title }}</td>
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
      remove (book) {
        this.$refs.itemList.openConfirm(book)
      }
    },
    created () {
      this.select({ hobby: 'books', uid: this.uid })
    },
    mounted () {
      const status = this.my ? 'My books' : `${this.name}'s books`
      this.setStatus(status)
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
