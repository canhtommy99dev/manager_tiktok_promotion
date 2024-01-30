import instantExportsAPIAXIOS from "../services/custom-axios";

const getProfileList = () => {
  return instantExportsAPIAXIOS.get(`/get_manager_in_profile`);
};

const postUserRegister = (
  user_name,
  password,
  phone_number,
  link_image_avatar,
  account_did_account
) => {
  return instantExportsAPIAXIOS.post(`/register_user_tiktok_promotion`, {
    user_name: user_name,
    password: password,
    phone_number: phone_number,
    link_image_avatar: link_image_avatar,
    account_did_account: account_did_account,
  });
};

const getUserGuestId = (id) => {
  return instantExportsAPIAXIOS.get(`/get_accounts_tiktok_promotion/${id}`);
};

const postUserAPI = (id, user_name, phone_number, set_vip) => {
  return instantExportsAPIAXIOS.put(`/update_user_tiktok_promotion/${id}`, {
    username: user_name,
    phone_number: phone_number,
    image_link: "null",
    set_vip: set_vip,
  });
};

const postPriceMoney = (id, coin_payment, calculator) => {
  return instantExportsAPIAXIOS.put(`/update_payment_in_app_user/${id}`, {
    coin_payment: coin_payment,
    calculator: calculator,
    contentpayment: `Bạn đã nạp số tiền +${coin_payment}`,
  });
};

const listUserInHomePagiation = (page) => {
  return instantExportsAPIAXIOS.get(
    `/get_manager_web_userlist?page=${page}&size=25`
  );
};

const listUserInHomePagiationKeyword = (page, searchKey) => {
  return instantExportsAPIAXIOS.get(
    `/get_search_user?page=${page}&size=25&key_search=${searchKey}`
  );
};

const updatePasswordkey = (idToken, passwordReset) => {
  return instantExportsAPIAXIOS.put(`/reset_password/${idToken}`, {
    password: passwordReset,
  });
};

const updatePrice = (idToken, coinUpdate) => {
  return instantExportsAPIAXIOS.put(`/update_coin_guest/${idToken}`, {
    coinUpdate: coinUpdate,
  });
};

const updatePasswordPin = (idToken) => {
  return instantExportsAPIAXIOS.put(`/reset_passpin/${idToken}`);
};

const updateResetBank = (idToken) => {
  return instantExportsAPIAXIOS.put(`/reset_bankuser/${idToken}`);
};

const updateUpdateBankAccount = (idToken, myAccountJSON) => {
  return instantExportsAPIAXIOS.put(`/update_accountpayment/${idToken}`, {
    my_account: myAccountJSON,
  });
};

const deleteIdToken = (idToken) => {
  return instantExportsAPIAXIOS.delete(`/delete_phone_user/${idToken}`);
};

export {
  getProfileList,
  postUserRegister,
  getUserGuestId,
  postUserAPI,
  postPriceMoney,
  listUserInHomePagiation,
  updatePasswordkey,
  updatePasswordPin,
  updateResetBank,
  updatePrice,
  listUserInHomePagiationKeyword,
  deleteIdToken,
  updateUpdateBankAccount,
};
