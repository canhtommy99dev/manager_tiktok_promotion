import instantExportsAPIAXIOS from "../services/custom-axios";

const getPriceListPeople = () => {
  return instantExportsAPIAXIOS.get(
    `/api_backend/get_list_history_transactionapp`
  );
};

const getListMoneyWithDraw = () => {
  return instantExportsAPIAXIOS.get(`/api_backend/list_manager_withdraw`);
};

const putAPIChangeMoney = (id, priceMoney, idUser) => {
  return instantExportsAPIAXIOS.put(`/api_backend/put_withdraw_money/${id}`, {
    priceMoney: priceMoney,
    idUser: idUser,
  });
};

const getListPageWithdrawMoney = (page, keySearch) => {
  return instantExportsAPIAXIOS.get(
    `/api_backend/get_search_user_withdraw?page=${page}&size=30&key_search=${keySearch}`
  );
};

export {
  getPriceListPeople,
  getListMoneyWithDraw,
  putAPIChangeMoney,
  getListPageWithdrawMoney,
};
