<template>
  <div>
    <div class="form-wrapper">
      <el-input class="inp" placeholder="Username" v-model="username"></el-input>
      <el-input class="inp" placeholder="Password" v-model="password" show-password></el-input>
      <el-button class="btn"  @click="login">login</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    login() {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', {username, password}).then(() => {
        this.$router.push({name: 'library'})
        this.$store.commit("setAlertSuccess", {status: true, title: 'Login Success'})
      }).catch(err => this.$store.commit("setAlertError", {status: true, title: 'Error Authorization'}))
    },
  }
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 0 auto;
}

.btn {
  width: 30%;
  margin: 20px auto 0;
}

.inp {
  padding: 5px;
  margin: 5px;
}
</style>