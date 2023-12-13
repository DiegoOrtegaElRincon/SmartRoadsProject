import http from "../http-common";
import AuthService from "./authService";



const getAll = () => {
  const token = AuthService.getAuthToken()
  return http.get("/activeelements", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const get = id => {
  const token = AuthService.getAuthToken()
  return http.get(`/activeelements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const create = data => {
  const token = AuthService.getAuthToken()
  return http.post("/activeelements", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const update = (id, data) => {
  const token = AuthService.getAuthToken()
  return http.put(`/activeelements/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const remove = id => {
  const token = AuthService.getAuthToken()
  return http.delete(`/activeelements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const removeAll = () => {
  const token = AuthService.getAuthToken()
  return http.delete(`/activeelements`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const findByUsername = UID => {
  const token = AuthService.getAuthToken()
  return http.get(`/activeelements?uid=${UID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const ActiveElementService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByUsername
};

export default ActiveElementService;
