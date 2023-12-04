import http from "../http-common";

const getAll = () => {
  return http.get("/admins");
};

const get = id => {
  return http.get(`/admins/${id}`);
};

const create = data => {
  return http.post("/admins", data);
};

const update = (id, data) => {
  return http.put(`/admins/${id}`, data);
};

const remove = id => {
  return http.delete(`/admins/${id}`);
};

const removeAll = () => {
  return http.delete(`/admins`);
};

const findByUsername = username => {
  return http.get(`/admins?username=${username}`);
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
