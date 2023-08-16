import instantExportsAPIAXIOS from "../services/custom-axios";

const getProfileList = () => {
  return instantExportsAPIAXIOS.get(`/api_backend/get_manager_in_profile`);
};

const postUserRegister = (
  user_name,
  password,
  phone_number,
  link_image_avatar,
  account_did_account
) => {
  return instantExportsAPIAXIOS.post(
    `/api_backend/register_user_tiktok_promotion`,
    {
      user_name: user_name,
      password: password,
      phone_number: phone_number,
      link_image_avatar: link_image_avatar,
      account_did_account: account_did_account,
    }
  );
};

const getUserGuestId = (id) => {
  return instantExportsAPIAXIOS.get(
    `/api_backend/get_accounts_tiktok_promotion/${id}`
  );
};

const postUserAPI = (id, user_name, phone_number, set_vip) => {
  return instantExportsAPIAXIOS.put(
    `/api_backend/update_user_tiktok_promotion/${id}`,
    {
      username: user_name,
      phone_number: phone_number,
      image_link: "null",
      set_vip: set_vip,
    }
  );
};

const postPriceMoney = (id, coin_payment, calculator) => {
  return instantExportsAPIAXIOS.put(
    `/api_backend/update_payment_in_app_user/${id}`,
    {
      coin_payment: coin_payment,
      calculator: calculator,
      contentpayment: `Bạn đã nạp số tiền +${coin_payment}`,
    }
  );
};

export {
  getProfileList,
  postUserRegister,
  getUserGuestId,
  postUserAPI,
  postPriceMoney,
};
