<template>
  <div>
    <h4>People</h4>
    <button class="btn btn-default" @click="test">Test</button>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/helpers/config'

  export default {
    methods: {
      async test () {
        const endpoint = config.apiUrl + '/shared/books'
        const params = {
          user: '57c1523c938b981302a12da3'
        }
        const { data } = await axios.get(endpoint, { params })
        console.log(data)
      }
    }
  }
</script>
