import instantExportsAPIAXIOS from "../services/custom-axios";

const insertNotificaitonTiktok = (
  content_notification,
  description_notification
) => {
  return instantExportsAPIAXIOS.post(
    `/api_backend/insert_notification_tiktok`,
    {
      content_notification: content_notification,
      description_notification: description_notification,
    }
  );
};

const getListNotificationTiktok = () => {
  return instantExportsAPIAXIOS.get(`/api_backend/list_notification_tiktok`);
};

const deleteNotificationTiktok = (id) => {
  return instantExportsAPIAXIOS.delete(
    `/api_backend/delete_notification/${id}`
  );
};

export {
  insertNotificaitonTiktok,
  getListNotificationTiktok,
  deleteNotificationTiktok,
};
