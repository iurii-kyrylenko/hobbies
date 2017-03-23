<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th style="width: 20%">User</th>
          <th style="width: 20%">Books</th>
          <th style="width: 20%">Movies</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="user in users">
            <td>{{ user.name }}</td>
            <td><router-link :to="user.tob" append>{{ user.books }}</router-link></td>
            <td><router-link :to="user.tom" append>{{ user.movies }}</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data: () => ({
      users: [
        {
          tob: '57c1523c938b981302a12da3/b',
          tom: '57c1523c938b981302a12da3/m',
          name: 'iurii',
          books: 'iurii\'s books',
          movies: 'iurii\'s movies'
        },
        {
          tob: '58c92442bec6835702e51946/b',
          tom: '58c92442bec6835702e51946/m',
          name: 'tester',
          books: 'tester\'s books',
          movies: 'tester\'s movies'
        }
      ]
    })
  }
</script>
