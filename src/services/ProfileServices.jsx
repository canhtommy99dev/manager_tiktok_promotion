import instantExportsAPIAXIOS from "../services/custom-axios";

const getProfileList = () => {
  return instantExportsAPIAXIOS.get(`/api_backend/get_manager_in_profile`);
};

export { getProfileList };
