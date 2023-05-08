import axios from "axios";
const config = require("./config/path.config");
const API_URL = config.auth;

class AuthService {
  async login(user) {
    return axios
      .post(API_URL + "signin", {
        user_username: user.username,
        user_password: user.password,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });

  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      user_username: user.username,
      user_email: user.email,
      user_password: user.password,
      user_firstname: user.firstname,
      user_lastname: user.lastname,
    });
  }

  checkLoginToken() {
    return axios.post(API_URL + "refreshToken", {
      user: JSON.parse(localStorage.getItem("user")),
    });
  }
}

export default new AuthService();
