<template>
  <div
    class="g-recaptcha"
    :data-sitekey="siteKey"
    data-callback="verifyCallback">
  </div>
</template>

<script>
  export default {
    props: ['siteKey'],
    mounted () {
      window['verifyCallback'] = res => {
        this.$emit('captchaResponse', res)
      }
      const doc = document.body
      const script = document.createElement('script')
      script.innerHTML = ''
      script.src = 'https://www.google.com/recaptcha/api.js'
      script.async = true
      script.defer = true
      doc.appendChild(script)
    }
  }
</script>
