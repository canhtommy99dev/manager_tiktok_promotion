import instantExportsAPIAXIOS from "./custom-axios";

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
  return instantExportsAPIAXIOS.post(`/add_production_app_home_page`, {
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
  return instantExportsAPIAXIOS.put(`/update_production_app_home_page/${id}`, {
    name_product: name_product,
    price: price,
    commission_discount: commission_discount,
    description: description,
    category: category,
    image: image,
    rating: rating,
  });
};

const listProductInHomePage = () => {
  return instantExportsAPIAXIOS.get(`/get_production_tiktok_promotion`);
};

const listProductInHomePagiation = (page) => {
  return instantExportsAPIAXIOS.get(
    `/get_production_tiktok_promotion_home_page_page?page=${page}&size=30`
  );
};

const deleteFile = (image) => {
  return instantExportsAPIAXIOS.delete(`/delefile`, {
    image: image,
  });
};

const deleteProduction = (id) => {
  return instantExportsAPIAXIOS.delete(
    `/delete_production_app_home_page/${id}`
  );
};

const getProductionInCode = (category) => {
  return instantExportsAPIAXIOS.get(
    `/find_product_category/?category=${category}`
  );
};

export {
  uploadImage,
  postInProduction,
  putInProduction,
  deleteFile,
  deleteProduction,
  getProductionInCode,
  listProductInHomePage,
  listProductInHomePagiation,
};
