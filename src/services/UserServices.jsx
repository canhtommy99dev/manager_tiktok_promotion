import instantExportsAPIAXIOS from "../services/custom-axios";

const UserServices = (pages) => {
  return instantExportsAPIAXIOS.get(`/api/users?page=${pages}`);
};

const postCreateUser = (name, jobs) => {
  return instantExportsAPIAXIOS.post(`/api/users`, { name: name, jobs: jobs });
};

const putUpdateUser = (name, jobs) => {
  return instantExportsAPIAXIOS.put(`/api/users/2`, { name: name, jobs: jobs });
};

const deleteUser = (id) => {
  return instantExportsAPIAXIOS.delete(`/api/users/2${id}`);
};

const loginApp = (email, password) => {
  return instantExportsAPIAXIOS.post(`/api/login`, { email, password });
};
export { UserServices, postCreateUser, putUpdateUser, deleteUser, loginApp };
