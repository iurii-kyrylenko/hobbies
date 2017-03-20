<template>
  <div>
    <button class="btn btn-default" @click="testApi">Test API</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  import axios from 'axios'
  import config from '@/helpers/config'

  export default {
    methods: {
      ...mapMutations('notification', ['setStatus']),
      async testApi () {
        const endpoint = config.apiUrl + '/shared/books'
        const params = {
          user: '57c1523c938b981302a12da3'
        }
        const { data } = await axios.get(endpoint, { params })
        console.log(data)
      }
    },
    mounted () {
      this.setStatus('People')
    },
    beforeDestroy () {
      this.setStatus('')
    }
  }
</script>
