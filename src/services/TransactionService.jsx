import instantExportsAPIAXIOS from "../services/custom-axios";

const UserTransactionServices = () => {
  return instantExportsAPIAXIOS.get(
    `api_backend/getlisttotal_transaction_manager`
  );
};

const ProductionTiktokPromotion = () => {
  return instantExportsAPIAXIOS.get(
    `/api_backend/get_production_tiktok_promotion`
  );
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
export {
  UserTransactionServices,
  ProductionTiktokPromotion,
  putUpdateUser,
  deleteUser,
  loginApp,
};
