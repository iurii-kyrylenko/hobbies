<template>
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">

      <form @submit.prevent="validateBeforeSubmit">

        <div class="form-group" :class="{ 'has-error': $v.email.$error }">
          <label class="control-label" for="email">Email</label>
          <input id="email"
                 v-model.trim="email"
                 @input="$v.email.$touch()"
                 class="form-control" type="text" placeholder="Email address">
          <p class="text-danger" v-show="$v.email.$error">{{ vmsgEmail }}</p>
        </div>

        <div class="form-group" :class="{ 'has-error': $v.password.$error }">
          <label class="control-label" for="password">Password</label>
          <input id="password"
                 v-model="password"
                 @input="$v.password.$touch()"
                 class="form-control" type="password" placeholder="Password">
          <p class="text-danger" v-show="$v.password.$error">{{ vmsgPassword }}</p>
        </div>

        <button type="submit" class="btn btn-default">
          Log in
        </button>

      </form>

    </div>
  </div>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        password: value => {
          const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,}$/
          return regexp.test(value)
        }
      }
    },
    computed: {
      vmsgEmail () {
        if (!this.$v.email.required) { return 'Email address is required' }
        if (!this.$v.email.email) { return 'Invalid email address' }
      },
      vmsgPassword () {
        if (!this.$v.password.required) { return 'Password is required' }
        if (!this.$v.password.password) { return 'Password requires at least 8 characters without spaces, one number, one lowercase and one uppercase letter' }
      }
    },
    methods: {
      validateBeforeSubmit () {
        this.$v.$touch()
        if (this.$v.$invalid) return
        this.submitForm()
      },
      submitForm () {
        console.log('Submitted data:', { ...this.$data })
      }
    }
  }
</script>
