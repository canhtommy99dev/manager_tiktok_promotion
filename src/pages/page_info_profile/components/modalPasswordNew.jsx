// import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { post } from "../";
// import { toast } from "react-toastify";
// import { postPriceMoney } from "../../../services/ProfileServices";

const ModalPasswordNew = (props) => {
  const { show, handleClose, phoneNumber, passwordReset } = props;
  // const handleSaveUser = async () => {
  //   let res = await postPriceMoney(idGet, price, "add");
  //   if (res) {
  //     handleClose();
  //     setPrice(0);
  //     handleUpdateTable();
  //     toast.success(
  //       `A đã nạp cho khách thành công với số tiền ${Number(
  //         price
  //       ).toLocaleString("en-US")}VNĐ`
  //     );
  //   } else {
  //     ///error
  //     toast.error("A user faliled");
  //   }
  // };

  // const closeApp = () => {
  //   handleClose();
  //   setPrice(0);
  // };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tài Khoản Reset Mật Khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">Người dùng: {phoneNumber}</label>
              <br />
              <label className="form-label">
                Mật Khẩu reset {passwordReset}
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalPasswordNew;
