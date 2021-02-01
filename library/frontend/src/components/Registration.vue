<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm form-wrapper">
      <el-form-item label="Username" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="re_password">
        <el-input type="password" v-model="ruleForm.re_password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="createUser">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      ruleForm: {
          password: '',
          re_password: '',
          username: ''
        },
        rules: {
          password: [
            { validator: this.validatePass, trigger: 'blur' }
          ],
          re_password: [
            { validator: this.validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: this.checkAge, trigger: 'blur' }
          ]
        },
    }
  },
  methods: {
    checkAge(rule, value, callback) {
      if (!value) {
        return callback(new Error('Please input the username'));
      }
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.re_password !== '') {
          this.$refs.ruleForm.validateField('re_password');
        }
        callback();
      }
    },
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    },
    createUser() {
      this.$store.dispatch('createUser', this.ruleForm).then(() => {
        this.$router.push({name: 'login',})
        this.$store.commit("setAlertSuccess", {status: true, title: 'Registration Success'})
      }).catch(err => this.$store.commit("setAlertError", {status: true, title: 'Error Registration'}))
    },
  }
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 20px auto;
}
</style>