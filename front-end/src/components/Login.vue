<template>
  <div class="row">
    <div class="col-sm-offset-4 col-sm-4">

      <form @submit.prevent="validateBeforeSubmit">

        <div class="form-group" :class="{ 'has-error': $v.name.$error }">
          <label class="control-label" for="name">Name</label>
          <input id="name"
                 v-model.trim="name"
                 @input="$v.name.$touch()"
                 class="form-control" type="text" placeholder="User name">
          <p class="text-danger" v-show="$v.name.$error">{{ vmsgName }}</p>
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
  import vh, { userName, password } from '@/helpers/validators'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        name: '',
        password: ''
      }
    },
    validations: {
      name: vh.vrules(userName),
      password: vh.vrules(password)
    },
    computed: {
      vmsgName () { return vh.vmsg(this.$v.name, userName) },
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
