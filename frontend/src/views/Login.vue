<template>
  <div class="box-login col-md-12" >
    <div class="card card-container">
      <div class="d-flex justify-content-center text-center">
        <b-alert
          show
          variant="danger"
          style="width: 350px"
          v-if="this.$store.state.auth.messageToken && this.$router.history.current.path == '/login'">
          {{ this.$store.state.auth.messageToken }}
        </b-alert>
      </div>
      <div style="text-align: center; margin-bottom: 20px;    align-self: center;">
        <lottie-player 
            if="logo"
            src="https://assets7.lottiefiles.com/packages/lf20_lRmBO5yl3g.json" 
            background="transparent"  
            style="width: 10rem; height: 10rem;" 
            autoplay loop
            ></lottie-player>
      </div>
      <b-overlay :show="loading" rounded="sm" opacity="0">
        <form name="form" @submit.prevent="handleLogin">
          <div class="form-group">
            <h4 class="mb-4" style="text-align: center">Login</h4>
            <label for="username" style="text-align: start">Username</label>
            <input
              v-model="user.username"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="errors.has('username')"
              class="alert alert-danger"
              role="alert"
            >
              Username is required!
            </div>
          </div>
          <div class="form-group">
            <label for="password" style="text-align: start">Password</label>
            <input
              v-model="user.password"
              v-validate="'required'"
              type="password"
              class="form-control"
              name="password"
            />
            <div v-if="errors.has('password')" class="alert alert-danger" role="alert">
              Password is required!
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="form-group" style="margin-top: 0px;width: 100%;">
              <button class="btn btn-dark btn-block" :disabled="loading" style="width: 100%; margin-top: 20px">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>เข้าสู่ระบบ</span>
              </button>
            </div>
          </div>
          <div class="form-group mt-2" v-if="message">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </form>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async mounted(){
    
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(() => {
            this.$router.push("/");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  margin-top: 10vh;
	background-color: white;
	border-radius: 1rem;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
}
.card {
  background-color: #ffffff;
  padding: 20px 25px 15px 25px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>