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
  import vh, { userName, email, password, confirmation } from '@/helpers/validators'

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
      name: vh.vrules(userName),
      email: vh.vrules(email),
      password: vh.vrules(password),
      confirmation: vh.vrules(confirmation)
    },
    computed: {
      vmsgName () { return vh.vmsg(this.$v.name, userName) },
      vmsgEmail () { return vh.vmsg(this.$v.email, email) },
      vmsgPassword () { return vh.vmsg(this.$v.password, password) },
      vmsgConfirmation () { return vh.vmsg(this.$v.confirmation, confirmation) }
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
