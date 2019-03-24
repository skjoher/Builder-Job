<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="email">
      <Input v-model="form.email" placeholder="Please enter your user name">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="Please enter the password">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>login</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    emailRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: 'Account cannot be empty', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: 'Password cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        email: this.emailRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            email: this.form.email,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
