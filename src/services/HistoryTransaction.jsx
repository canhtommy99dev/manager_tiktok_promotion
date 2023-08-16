import instantExportsAPIAXIOS from "../services/custom-axios";

const getPriceListPeople = () => {
  return instantExportsAPIAXIOS.get(
    `/api_backend/get_list_history_transactionapp`
  );
};

export { getPriceListPeople };
