import instantExportsAPIAXIOS from "../services/custom-axios";

const UserTransactionServices = () => {
  return instantExportsAPIAXIOS.get(`/getlisttotal_transaction_manager`);
};

const ProductionTiktokPromotion = () => {
  return instantExportsAPIAXIOS.get(`/get_production_tiktok_promotion`);
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

const getPageTransactionId = (id, pages) => {
  return instantExportsAPIAXIOS.get(
    `/get_list_total_trasaction_page/${id}?page=${pages}`
  );
};

const deleteRandomOrder = (id) => {
  return instantExportsAPIAXIOS.delete(`/reset_random_in_today/${id}`);
};

export {
  UserTransactionServices,
  ProductionTiktokPromotion,
  putUpdateUser,
  deleteUser,
  loginApp,
  getPageTransactionId,
  deleteRandomOrder,
};
