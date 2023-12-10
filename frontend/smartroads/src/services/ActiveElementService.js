import http from "../http-common";

const getAll = () => {
  return http.get("/activeelements");
};

const get = id => {
  return http.get(`/activeelements/${id}`);
};

const create = data => {
  return http.post("/activeelements", data);
};

const update = (id, data) => {
  return http.put(`/activeelements/${id}`, data);
};

const remove = id => {
  return http.delete(`/activeelements/${id}`);
};

const removeAll = () => {
  return http.delete(`/activeelements`);
};

const findByUsername = UID => {
  return http.get(`/activeelements?uid=${UID}`);
};

const ActicveElementService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByUsername
};

export default ActicveElementService;
