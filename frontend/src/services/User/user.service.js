import axios from "axios";
const config = require("../config/path.config");
const API_URL = config.user;
import authHeader from "../auth-header";

class UserService {
  getAllUser() {
    return axios.get(API_URL + "getAllUser", { headers: authHeader() });
  }
  createUser(data) {
    return axios.post(
      API_URL + "createUser",
      {
        data: data,
      },
      { headers: authHeader() }
    );
  }

  editUser(data) {
    return axios.post(
      API_URL + "editUser",
      {
        data: data,
      },
      { headers: authHeader() }
    );
  }

  resetPassword(passwordNew,passwordNewMath,uid) {
    return axios.post(
      API_URL + "changePasswordByAdmin",
      {
        passwordNew: passwordNew,
        passwordNewMath: passwordNewMath,
        uid: uid,
      },
      { headers: authHeader() }
    );
  }
  getLoginLogs(id) {
    return axios.get(API_URL + "getLoginLogs", {
      params: {
        id: id,
      },
      headers: authHeader(),
    });
  }


}
export default new UserService();
