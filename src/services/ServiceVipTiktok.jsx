import instantExportsAPIAXIOS from "../services/custom-axios";

const getListVipGet = (id) => {
  return instantExportsAPIAXIOS.get(`/get_vip_toktok_id/${id}`);
};

const postUserViper = (id_promotion_vip, id_user_vip, sort) => {
  return instantExportsAPIAXIOS.post(`/add_get_vip_toktok`, {
    id_promotion_vip: id_promotion_vip,
    id_user_vip: id_user_vip,
    sort: sort,
  });
};

const deleteAPiViper = (id) => {
  return instantExportsAPIAXIOS.delete(`/deleteId/${id}`);
};

export { postUserViper, getListVipGet, deleteAPiViper };
