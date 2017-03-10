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
  import vh, { email, password } from '@/helpers/validators'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    validations: {
      email: vh.vrules(email),
      password: vh.vrules(password)
    },
    computed: {
      vmsgEmail () { return vh.vmsg(this.$v.email, email) },
      vmsgPassword () { return vh.vmsg(this.$v.password, password) }
    },
    methods: {
      ...mapMutations('notification', ['notify']),
      validateBeforeSubmit () {
        this.$v.$touch()
        if (this.$v.$invalid) return
        this.submitForm()
      },
      async submitForm () {
        try {
          await this.$store.dispatch('auth/login', { ...this.$data })
          this.notify({ msg: 'You have been looged in.', type: 'info' })
          this.$router.push('/home')
        } catch (e) {
          this.notify({ msg: 'You have failed to log in. Try again with another credentials.', type: 'danger' })
        }
      }
    }
  }
</script>
