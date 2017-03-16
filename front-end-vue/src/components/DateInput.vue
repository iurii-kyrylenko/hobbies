<template>
  <div>
    <slot></slot>
    <span class="label" :class="{ 'label-my-success': value, 'label-my-error': !value }">
      {{ value | date }}
    </span>
    <input v-once :value="value | date(null)" :id="id" @input="updateDate"
           placeholder="Enter date in free format..." class="form-control">
  </div>
</template>

<script>
  export default {
    props: ['value', 'id'],
    methods: {
      updateDate (event) {
        const test = new Date(event.target.value)
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
