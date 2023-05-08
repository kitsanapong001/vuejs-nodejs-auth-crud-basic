<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="currentUser" to="/product">product</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item v-if="currentUser" to="/profile"> {{ this.$store.state.auth.user.email }}</b-nav-item>
            <b-nav-item v-if="!currentUser" to="/register"> Register</b-nav-item>
            <b-nav-item v-if="!currentUser" to="/login"> Login</b-nav-item>
            <b-nav-item v-if="currentUser" @click.prevent="clickLogout">Logout</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
  <div class="container mt-5">
      <router-view />
  </div>
</div>
</template>
<script>
import AuthService from "../src/services/auth.service";
import JQuery from "jquery";

window.$ = JQuery;
export default {
  name: "app",
  data() {
    return {
      messageToken: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.checkTokenLogin();
  },
  methods: {
    checkRole() {
      const roles = this.$store.state.auth.user.roles;
      if (roles == "root" || roles == "admin") {
        return true;
      } else {
        return false;
      }
    },
    checkTokenLogin() {
      if (this.$store.state.auth.status.loggedIn) {
        AuthService.checkLoginToken().then(async (response) => {
          if (response.data.message != "ok") {
            this.$store.state.auth.messageToken = await response.data.message;
            this.logOut();
          } else {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
        });
      }
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    clickLogout(){
      this.$swal.fire({
        title: 'คุณต้องการออกจากระบบหรือไม่',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'ออกจากระบบ',
        cancelButtonText: "ยกเลิก",

      }).then((result) => {
        if (result.isConfirmed) {
          this.logOut();
        }
      })
    },
  },
};
</script>
<style>
@font-face {
  font-family: KingPowerHeadline-Regular;
  src: url("./assets/font/KingPowerHeadline-Regular.ttf");
}
*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
body,
html {
  font-family: KingPowerHeadline-Regular !important;
}


</style>
