import { Button, Modal } from "react-bootstrap";
import { putAPIChangeMoney } from "../../../services/HistoryTransaction";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ModalConfirmPaymentGuestWithdraw = (props) => {
  const {
    show,
    handleClose,
    nameGetConfirm,
    idBank,
    idBankName,
    handleUpdateTable,
  } = props;

  const getAPIProfile = async () => {
    const res = await putAPIChangeMoney(
      nameGetConfirm.id,
      nameGetConfirm.id_price_withdraw,
      nameGetConfirm.id_user_money
    );
    if (res) {
      toast.success("Change Money Guest Success");
      handleUpdateTable();
      handleClose();
    } else {
      toast.error("Delete Failed");
      handleClose();
    }
  };

  // const myObject = {
  //   account_name: "John Doe",
  //   id_bank: "123456789",
  //   more_back: "Some additional information",
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
          <Modal.Title>Bạn muốn chuyển cho khách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://img.vietqr.io/image/${idBankName}-${idBank}-compact.png?amount=${nameGetConfirm.id_price_withdraw}&addInfo=Rut tien cho ban id ${nameGetConfirm.id_user_money}`}
            width="100%"
            height="100%"
          />
          <br />
          {`STK Của khách: ${idBankName} - ${idBank}`}
          <br />
          Bạn muôn rút cho khách {nameGetConfirm.id_price_withdraw} VNĐ
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => getAPIProfile()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConfirmPaymentGuestWithdraw;
