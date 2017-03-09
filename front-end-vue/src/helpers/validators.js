import { required, email as emailRule, sameAs } from 'vuelidate/lib/validators'

export const userName = [
  {
    rule: required,
    msg: 'Name is required'
  },
  {
    rule (value) {
      const regexp = /^[A-Za-z][A-Za-z0-9]{4,}$/
      return regexp.test(value)
    },
    msg: 'Name requires at least 5 letters or digits and begins with letter'
  }
]

export const email = [
  {
    rule: required,
    msg: 'Email address is required'
  },
  {
    rule: emailRule,
    msg: 'Invalid email address'
  }
]

export const password = [
  {
    rule: required,
    msg: 'Password is required'
  },
  {
    rule (value) {
      const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,}$/
      return regexp.test(value)
    },
    msg: 'Password requires at least 8 characters without spaces, one number, one lowercase and one uppercase letter'
  }
]

export const confirmation = [
  {
    rule: required,
    msg: 'Confirmation is required'
  },
  {
    rule: sameAs('password'),
    msg: 'Password mismatch'
  }
]

const vrules = (vdata) => {
  return vdata.reduce((acc, cur, i) => {
    acc[i] = cur.rule
    return acc
  }, {})
}

const vmsg = (validator, vdata) => {
  for (let i = 0; i < vdata.length; i++) {
    if (!validator[i]) { return vdata[i].msg }
  }
}

export default {
  vrules,
  vmsg
}
