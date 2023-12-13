import axios from "axios";
export const multipartHttp = axios.create({
  baseURL: "http://localhost:3000/",
});
export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/json',
}
});
