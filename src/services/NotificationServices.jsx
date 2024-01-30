import instantExportsAPIAXIOS from "../services/custom-axios";

const insertNotificaitonTiktok = (
  content_notification,
  description_notification
) => {
  return instantExportsAPIAXIOS.post(`/insert_notification_tiktok`, {
    content_notification: content_notification,
    description_notification: description_notification,
  });
};

const getListNotificationTiktok = () => {
  return instantExportsAPIAXIOS.get(`/list_notification_tiktok`);
};

const deleteNotificationTiktok = (id) => {
  return instantExportsAPIAXIOS.delete(`/delete_notification/${id}`);
};

export {
  insertNotificaitonTiktok,
  getListNotificationTiktok,
  deleteNotificationTiktok,
};
