import instantExportsAPIAXIOS from "../services/custom-axios";

const uploadImage = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return instantExportsAPIAXIOS.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const postInProduction = (
  name_product,
  price,
  commission_discount,
  description,
  category,
  image,
  rating
) => {
  return instantExportsAPIAXIOS.post(`/add_production_app`, {
    name_product: name_product,
    price: price,
    commission_discount: commission_discount,
    description: description,
    category: category,
    image: image,
    rating: rating,
  });
};

const putInProduction = (
  id,
  name_product,
  price,
  commission_discount,
  description,
  category,
  image,
  rating
) => {
  return instantExportsAPIAXIOS.put(`/update_production_app/${id}`, {
    name_product: name_product,
    price: price,
    commission_discount: commission_discount,
    description: description,
    category: category,
    image: image,
    rating: rating,
  });
};

const deleteFile = (image) => {
  return instantExportsAPIAXIOS.delete(`/delefile`, {
    image: image,
  });
};

const deleteProduction = (id) => {
  return instantExportsAPIAXIOS.delete(`/delete_production_app/${id}`);
};

const getProductionInCode = (category) => {
  return instantExportsAPIAXIOS.get(
    `/find_product_category/?category=${category}`
  );
};

const getFindProduction = (keysearch, category, page) => {
  return instantExportsAPIAXIOS.get(
    `/get_search_production?page=${page}&size=25&key_search=${keysearch}&category=${category}`
  );
};
const getIdProduction = (id) => {
  return instantExportsAPIAXIOS.get(`/get_infomation_product/${id}`);
};

export {
  uploadImage,
  postInProduction,
  putInProduction,
  deleteFile,
  deleteProduction,
  getProductionInCode,
  getFindProduction,
  getIdProduction,
};
