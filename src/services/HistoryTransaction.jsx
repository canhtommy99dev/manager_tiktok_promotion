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

export { getPriceListPeople, getListMoneyWithDraw, putAPIChangeMoney };
