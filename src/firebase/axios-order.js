import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-maker-3e4d2.firebaseio.com"
});

export default instance;
