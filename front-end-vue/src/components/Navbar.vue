<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">

      <div class="navbar-header">
        <router-link active-class="active" to="/home" class="navbar-brand">
          <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
          &nbsp;My Hobbies
        </router-link>
      </div>

      <ul class="nav navbar-nav">
        <router-link tag="li" active-class="active" to="/people">
          <a>
            <span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
            &nbsp;People
          </a>
        </router-link>
      </ul>

      <dropdown-menu v-if="isLoggedIn" v-once
                     header="Personal" icon="glyphicon-sunglasses"
                     :content="personal" />

      <p class="navbar-text"><b>{{ status }}</b></p>

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
  import DropdownMenu from './DropdownMenu'

  export default {
    components: { DropdownMenu },
    data: () => ({
      personal: [
        {
          title: 'My books',
          path: '/books',
          icon: 'glyphicon-book'
        },
        {
          title: 'My movies',
          path: '/movies',
          icon: 'glyphicon-film'
        },
        {
          title: 'My settings',
          path: '/profile',
          icon: 'glyphicon-cog'
        }
      ]
    }),
    computed: {
      ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
      ...mapGetters('notification', ['status'])
    },
    methods: {
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
  a.active {
    color: #000 !important;
    text-shadow: 2px 2px #ccc;
  }
</style>
