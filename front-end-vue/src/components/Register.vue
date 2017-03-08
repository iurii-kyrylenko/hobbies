<template>
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">

      <form @submit.prevent="validateBeforeSubmit">

        <div class="form-group" :class="{ 'has-error': $v.name.$error }">
          <label class="control-label" for="name">Name</label>
          <input id="name"
                 v-model.trim="name"
                 @input="$v.name.$touch()"
                 class="form-control" type="text" placeholder="User name">
          <p class="text-danger" v-show="$v.name.$error">{{ vmsgName }}</p>
        </div>

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

        <div class="form-group" :class="{ 'has-error': $v.confirmation.$error }">
          <label class="control-label" for="confirmation">Confirmation</label>
          <input id="confirmation"
                 v-model="confirmation"
                 @input="$v.confirmation.$touch()"
                 class="form-control" type="password" placeholder="Password confirmation">
          <p class="text-danger" v-show="$v.confirmation.$error">{{ vmsgConfirmation }}</p>
        </div>

        <button type="submit" class="btn btn-default">
          Sign up
        </button>

      </form>

    </div>
  </div>
</template>

<script>
  import { required, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        name: '',
        email: '',
        password: '',
        confirmation: ''
      }
    },
    validations: {
      name: {
        required,
        name: value => {
          const regexp = /^[A-Za-z][A-Za-z0-9]{4,}$/
          return regexp.test(value)
        }
      },
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
      },
      confirmation: {
        required,
        confirmation: sameAs('password')
      }
    },
    computed: {
      vmsgName () {
        if (!this.$v.name.required) { return 'Name is required' }
        if (!this.$v.name.minLength) { return 'Name requires at least 5 letters or digits, does not contain spaces and begins with letter' }
      },
      vmsgEmail () {
        if (!this.$v.email.required) { return 'Email address is required' }
        if (!this.$v.email.email) { return 'Invalid email address' }
      },
      vmsgPassword () {
        if (!this.$v.password.required) { return 'Password is required' }
        if (!this.$v.password.password) { return 'Password requires at least 8 characters without spaces, one number, one lowercase and one uppercase letter' }
      },
      vmsgConfirmation () {
        if (!this.$v.confirmation.required) { return 'Password is required' }
        if (!this.$v.confirmation.confirmation) { return 'Password mismatch' }
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
