<template>
  <div>
    <slot></slot>
    <span class="label" :class="{ 'label-my-success': value, 'label-my-error': !value }">
      {{ formatDate1 }}
    </span>
    <input ref="textInput" :id="id" @input="updateDate($event.target.value)"
           placeholder="Enter date in free format..." class="form-control">
  </div>
</template>

<script>
  export default {
    props: ['value', 'id'],
    computed: {
      formatDate () {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
        const year = this.value.getFullYear()
        const month = this.value.getMonth()
        const day = this.value.getDate()
        return `${months[month]} ${day}, ${year}`
      },
      formatDate1 () {
        if (!this.value) return 'Invalid Date'
        return this.formatDate
      },
      formatDate2 () {
        if (!this.value) return null
        return this.formatDate
      }
    },
    mounted () {
      this.$refs.textInput.value = this.formatDate2
    },
    methods: {
      updateDate (value) {
        const test = new Date(value)
        const date = test.toJSON() ? test : null
        this.$emit('input', date)
      }
    }
  }
</script>

<style scoped>
  .label {
    padding-top: .3em !important;
    border-radius: .4em !important;
  }
  .label-my-success {
    background-color: #008000;
  }
  .label-my-error {
    background-color: #a94442;
  }
</style>
