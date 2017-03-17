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
        <li :class="{  active: isPersonalActive }">
          <a href="#" @click.prevent="toggle">Personal <span class="caret"></span></a>
          <ul :class="{ 'dropdown-menu': toggled, 'drop-hide': !toggled }">
            <router-link @click.native="toggle" tag="li" active-class="active" to="/books">
              <a>
                <span class="glyphicon glyphicon-book" aria-hidden="true"></span>
                &nbsp;Books
              </a>
            </router-link>

            <router-link @click.native="toggle" tag="li" active-class="active" to="/movies">
              <a>
                <span class="glyphicon glyphicon-film" aria-hidden="true"></span>
                &nbsp;Movies
              </a>
            </router-link>
          </ul>
        </li>
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
            Logged in as: &lt;{{ currentUser.name }}&gt;{{ currentUser.email }}
          </a>
        </li>

        <li>
          <a href="#" @click.prevent="logout">
            <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
            &nbsp;Log out
          </a>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      isPersonalActive () {
        return this.$route.path.includes('/books') || this.$route.path.includes('/movies')
      },
      ...mapGetters('auth', ['isLoggedIn', 'currentUser'])
    },
    data: () => ({ toggled: false }),
    methods: {
      toggle () { this.toggled = !this.toggled },
      ...mapMutations('notification', ['notify']),
      logout () {
        this.$store.dispatch('auth/logout')
        this.notify({ msg: 'You have been logged out.', type: 'info' })
        this.$router.push('/home')
      }
    }
  }
</script>

<style>
  .dropdown-menu {
    display: block !important;
  }
  .drop-hide {
    display: none;
  }
  a.active {
    color: #000 !important;
    text-shadow: 2px 2px #ccc;
  }
</style>
