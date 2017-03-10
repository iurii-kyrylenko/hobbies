export default {
  get apiUrl () {
    return process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:3000/api'
  },
  get reCaptchaSiteKey () {
    return '6LeUuSUTAAAAAElwIcAHk994ErqNeqw7aQxlsw_H'
  }
}
