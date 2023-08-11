import instantExportsAPIAXIOS from "../services/custom-axios";

const getListVipGet = (id) => {
  return instantExportsAPIAXIOS.get(`/api_backend/get_vip_toktok_id/${id}`);
};

const postUserViper = (id_promotion_vip, id_user_vip, sort) => {
  return instantExportsAPIAXIOS.post(`/api_backend/add_get_vip_toktok`, {
    id_promotion_vip: id_promotion_vip,
    id_user_vip: id_user_vip,
    sort: sort,
  });
};

const deleteAPiViper = (id) => {
  return instantExportsAPIAXIOS.delete(`/api_backend/deleteId/${id}`);
};

export { postUserViper, getListVipGet, deleteAPiViper };
