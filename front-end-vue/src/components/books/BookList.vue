<template>
  <div>
    <item-list searchPlaceholder="Search for book title or author"
               addPrompt="Add Book"
               removeHeader="Removing Book"
               downloadPrompt="Download Books"
               uploadPrompt="Upload Books"
               exportFileName="books.json">
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
           </tbody>
        </table>
      </div>
    </item-list>
  </div>
</template>

<script>
  import ItemList from '../ItemList'

  export default {
    components: { ItemList }
  }
</script>
