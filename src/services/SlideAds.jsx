import instantExportsAPIAXIOS from "../services/custom-axios";
const getListBanner = () => {
  return instantExportsAPIAXIOS.get(`/slide_image_show`);
};

const postListBanner = (name_title, image_slide, content) => {
  return instantExportsAPIAXIOS.post(`/post_slide_image`, {
    name_title: name_title,
    image_slide: image_slide,
    content: content,
  });
};

const deleteListBanner = (id) => {
  return instantExportsAPIAXIOS.delete(`/delete_slide_ads/${id}`);
};

export { getListBanner, postListBanner, deleteListBanner };
