<template>
  <div>
    <item-list ref="itemList"
               selector="books"
               searchPlaceholder="Search for book title or author"
               addPrompt="Add Book"
               removeHeader="Removing Book"
               downloadPrompt="Download Books"
               uploadPrompt="Upload Books">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th style="width: 10%"></th>
              <th style="width: 15%">Completed</th>
              <th style="width: 8%">Mode</th>
              <th style="width: 25%">Author</th>
              <th>Title</th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="book in books">
                <td>
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
  import { mapGetters } from 'vuex'

  export default {
    components: { ItemList },
    computed: {
      ...mapGetters('items', ['books'])
    },
    methods: {
      remove (book) {
        this.$refs.itemList.openConfirm(book)
      }
    }
  }
</script>
