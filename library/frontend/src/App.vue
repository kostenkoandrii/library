<template>
  <div id="app">
    <div>
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          :default-active=activeMenu()
          active-text-color="#ffd04b">
        <div class="item-wrapper">
          <div class="item-wrapper">
            <el-menu-item :disabled="!userIsAuthenticated" index="4" @click="goToLibrary">Library</el-menu-item>
          </div>
          <div class="item-wrapper" style="margin-left: auto">
            <el-menu-item index="1" @click="goToRegistration">Registration</el-menu-item>
            <el-menu-item index="2" @click="goToLogin">Login</el-menu-item>
            <el-menu-item class="logout-btn" index="3" @click="logout">Logout</el-menu-item>
          </div>
        </div>
      </el-menu>
    </div>
    <el-alert
        v-show="alertSuccess.status"
        :title=alertSuccess.title
        type="success"
        center
        :closable="false"
        show-icon>
    </el-alert>
    <el-alert
        v-show="alertError.status"
        :title=alertError.title
        type="error"
        center
        :closable="false"
        show-icon>
    </el-alert>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      showDialog: true,
      menu: {
        "/library": "4",
        "/login": "2",
        "/register": "1",
      }
    }
  },
  computed: {
      ...mapGetters({
        alertSuccess: 'getAlertSuccess',
        alertError: 'getAlertError',
        userIsAuthenticated: 'userIsAuthenticated',
      }),
    },
  methods: {
    activeMenu() {
      return this.menu[this.$route.path]
    },
    goToLibrary() {
      this.$router.push({name: 'library'}).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
    goToLogin() {
      this.$router.push({name: 'login'}).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
    goToRegistration() {
      this.$router.push({name: 'register',}).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
    logout() {
      if (this.userIsAuthenticated) {
        this.$store.dispatch('logout').then(() => {
          this.$router.push({name: 'login',}).catch(error => {
            if (error.name !== "NavigationDuplicated") {
              throw error;
            }
          });
          this.$store.commit("setAlertSuccess", {status: true, title: 'Logout Success'})
          setTimeout(function () {
            window.location.reload()
          }, 2000);
        })
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logout-btn {
  margin-right: auto;
}

.item-wrapper {
  display: flex;
  flex-direction: row;
}
</style>
