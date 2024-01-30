import instantExportsAPIAXIOS from "./custom-axios";
const getListBanner = () => {
  return instantExportsAPIAXIOS.get(`/slide_image_show_endnow`);
};

const postListBanner = (name_title, image_slide, content) => {
  return instantExportsAPIAXIOS.post(`/post_slide_image_endnow`, {
    name_title: name_title,
    image_slide: image_slide,
    content: content,
  });
};

const deleteListBanner = (id) => {
  return instantExportsAPIAXIOS.delete(`/delete_slide_ads_endnow/${id}`);
};

export { getListBanner, postListBanner, deleteListBanner };
