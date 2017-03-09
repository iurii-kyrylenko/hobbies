<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">

      <div class="navbar-header">
        <router-link active-class="active" to="/home" class="navbar-brand">
          <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
          &nbsp;My Hobbies
        </router-link>
      </div>

      <ul v-if="isLoggedIn" class="nav navbar-nav">
        <router-link tag="li" active-class="active" to="/books">
          <a>
            <span class="glyphicon glyphicon-book" aria-hidden="true"></span>
            &nbsp;Books
          </a>
        </router-link>

        <router-link tag="li" active-class="active" to="/movies">
          <a>
            <span class="glyphicon glyphicon-film" aria-hidden="true"></span>
            &nbsp;Movies
          </a>
        </router-link>
      </ul>

      <ul v-if="!isLoggedIn" class="nav navbar-nav navbar-right">
        <router-link tag="li" active-class="active" to="/login">
          <a>
            <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>
            &nbsp;Log in
          </a>
        </router-link>

        <router-link tag="li" active-class="active" to="/register">
          <a>
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
            &nbsp;Sign up
          </a>
        </router-link>
      </ul>

      <ul v-if="isLoggedIn" class="nav navbar-nav navbar-right">
        <li>
          <a>
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
            Logged in as: <{{ currentUser.name }}>{{ currentUser.email }}
          </a>
        </li>

        <router-link tag="li" to="/home">
          <a>
            <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
            &nbsp;Log out
          </a>
        </router-link>
      </ul>

    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('auth', ['isLoggedIn', 'currentUser'])
    }
  }
</script>

<style>
  a.active {
    color: #000 !important;
    text-shadow: 2px 2px #ccc;
  }
</style>
