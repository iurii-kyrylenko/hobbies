<template>
  <ul class="nav navbar-nav">
    <li :class="{  active: isGroupActive }">
      <a ref="invoker" href="#" @click.prevent="isVisible = !isVisible">
        <span class="glyphicon" :class="[icon]" aria-hidden="true"></span>
        {{ header }}&nbsp;
        <span class="caret"></span>
      </a>
      <ul :class="[isVisible ? 'dropdown-menu' : 'drop-hide']">
        <router-link v-for="item in content"
                     v-bind:key="item.title"
                     tag="li" active-class="active"
                     :to="item.path">
          <a>
            <span class="glyphicon" :class="[item.icon]" aria-hidden="true"></span>
            &nbsp;{{ item.title }}
          </a>
        </router-link>
      </ul>
    </li>
  </ul>
</template>

<script>
  export default {
    methods: {
      hide ({ target }) {
        const invoker = this.$refs.invoker
        if (invoker !== target && !invoker.contains(target)) {
          this.isVisible = false
        }
      }
    },
    mounted () {
      document.body.addEventListener('click', this.hide)
    },
    beforeDestroy () {
      document.body.removeEventListener('click', this.hide)
    },
    props: ['content', 'header', 'icon'],
    computed: {
      isGroupActive () {
        return this.$props.content.some(({ path }) =>
          this.$route.path.includes(path))
      }
    },
    data: () => ({ isVisible: false })
  }
</script>

<style scoped>
  .dropdown-menu {
    display: block !important;
  }
  .drop-hide {
    display: none;
  }
  .dropdown-menu .active a, .dropdown-menu .active a:hover {
    background-color: #a7a7a7;
  }
</style>
