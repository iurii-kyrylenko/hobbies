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

      <ul class="nav navbar-nav navbar-right">
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

    </div>
  </nav>
</template>

<style>
  a.active {
    color: #000 !important;
    text-shadow: 2px 2px #ccc;
  }
</style>
