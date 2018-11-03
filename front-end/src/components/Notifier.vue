<template>
  <div v-if="message" :class="[alertClass]" class="alert">
      <button type="button" class="close" @click="remove">
          <span aria-hidden="true">&times;</span>
      </button>
      {{ message }}
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters('notification', ['message', 'alertClass'])
    },
    methods: {
      ...mapMutations('notification', ['remove'])
    }
  }
</script>
