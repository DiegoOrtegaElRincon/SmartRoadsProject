import http from "../http-common";
import AuthService from "./authService";

const getAll = () => {
  const token = AuthService.getAuthToken();
  return http.get("/changingelements", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const get = (id) => {
  const token = AuthService.getAuthToken();
  return http.get(`/changingelements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const create = (data) => {
  const token = AuthService.getAuthToken();
  return http.post("/changingelements", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const update = (id, data) => {
  const token = AuthService.getAuthToken();
  return http.put(`/changingelements/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const remove = (id) => {
  const token = AuthService.getAuthToken();
  return http.delete(`/changingelements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const removeAll = () => {
  const token = AuthService.getAuthToken();
  return http.delete(`/changingelements`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const findByUID = (UID) => {
  const token = AuthService.getAuthToken();
  return http.get(`/changingelements?uid=${UID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const ChangingElementService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByUID,
};

export default ChangingElementService;
