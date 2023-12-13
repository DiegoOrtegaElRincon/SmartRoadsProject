import http, { multipartHttp } from "../http-common";
import AuthService from "./authService";


const getAll = () => {
  const token = AuthService.getAuthToken()
  return http.get("/admins", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const get = id => {
  const token = AuthService.getAuthToken()
  return http.get(`/admins/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const create = data => {
  const token = AuthService.getAuthToken()
  return multipartHttp.post("/admins", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const update = (id, data) => {
  const token = AuthService.getAuthToken()
  return http.put(`/admins/noimage/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const remove = id => {
  const token = AuthService.getAuthToken()
  return http.delete(`/admins/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const removeAll = () => {
  const token = AuthService.getAuthToken()
  return http.delete(`/admins`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const findByUsername = username => {
  const token = AuthService.getAuthToken()
  return http.get(`/admins?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const AdminService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByUsername
};

export default AdminService;
