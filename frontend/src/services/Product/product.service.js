import axios from "axios";
const config = require("../config/path.config");
const API_URL = config.product;
import authHeader from "../auth-header";

class UserService {
  getAllProduct() {
    return axios.get(API_URL + "getAllProduct", { headers: authHeader() });
  }
  createProduct(data) {
    return axios.post(
      API_URL + "createProduct",
      {
        data: data,
      },
      { headers: authHeader() }
    );
  }

  editProduct(data) {
    return axios.post(
      API_URL + "editProduct",
      {
        data: data,
      },
      { headers: authHeader() }
    );
  }

  deleteProduct(product_id) {
    return axios.post(
      API_URL + "deleteProduct",
      {
        product_id: product_id,
      },
      { headers: authHeader() }
    );
  }

}
export default new UserService();
