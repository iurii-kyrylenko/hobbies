<template>
  <div>
    <slot></slot>
    <span class="label" :class="{ 'label-my-success': value, 'label-my-error': !value }">
      {{ value | date }}
    </span>
    <input ref="textInput" :id="id" @input="updateDate($event.target.value)"
           placeholder="Enter date in free format..." class="form-control">
  </div>
</template>

<script>
  import { formatDate } from '@/helpers/formatters'
  export default {
    props: ['value', 'id'],
    mounted () {
      this.$refs.textInput.value = this.value
        ? formatDate(this.value)
        : null
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
