import instantExportsAPIAXIOS from "../services/custom-axios";

const uploadImage = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return instantExportsAPIAXIOS.post("/api_backend/upload", formData, {
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
  return instantExportsAPIAXIOS.post(`/api_backend/add_production_app`, {
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
  return instantExportsAPIAXIOS.put(
    `/api_backend/update_production_app/${id}`,
    {
      name_product: name_product,
      price: price,
      commission_discount: commission_discount,
      description: description,
      category: category,
      image: image,
      rating: rating,
    }
  );
};

const deleteFile = (image) => {
  return instantExportsAPIAXIOS.delete(`/api_backend/delefile`, {
    image: image,
  });
};

const deleteProduction = (id) => {
  return instantExportsAPIAXIOS.delete(
    `/api_backend/delete_production_app/${id}`
  );
};

const getProductionInCode = (category) => {
  return instantExportsAPIAXIOS.get(
    `/api_backend/find_product_category/?category=${category}`
  );
};

const getFindProduction = (keysearch, category, page) => {
  return instantExportsAPIAXIOS.get(
    `api_backend/get_search_production?page=${page}&size=25&key_search=${keysearch}&category=${category}`
  );
};

export {
  uploadImage,
  postInProduction,
  putInProduction,
  deleteFile,
  deleteProduction,
  getProductionInCode,
  getFindProduction,
};
