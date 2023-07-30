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

export { uploadImage, postInProduction };
