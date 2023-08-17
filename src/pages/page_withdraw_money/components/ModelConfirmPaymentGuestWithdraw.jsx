import { Button, Modal } from "react-bootstrap";
import { putAPIChangeMoney } from "../../../services/HistoryTransaction";
import { toast } from "react-toastify";

const ModalConfirmPaymentGuestWithdraw = (props) => {
  const { show, handleClose, nameGetConfirm, nameProfile, handleUpdateTable } =
    props;

  const getAPIProfile = async () => {
    const res = await putAPIChangeMoney(
      nameGetConfirm.id,
      nameGetConfirm.id_price_withdraw,
      nameGetConfirm.id_user_money
    );
    // console.log("ccsscsss", nameProfile);
    // const res = getProfileList(nameGetConfirm.id_user_money);
    // console.log("mmmccc", nameGetConfirm.id_user_money);
    // const res = await deleteProduction(nameGetConfirm.id);
    if (res) {
      toast.success("Change Money Guest Success");
      handleUpdateTable();
      handleClose();
    } else {
      toast.error("Delete Failed");
      handleClose();
    }
  };

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
            src={`https://img.vietqr.io/image/${nameProfile.payment_bank.more_back.code}-${nameProfile.payment_bank.id_bank}-compact.png?amount=${nameGetConfirm.id_price_withdraw}&addInfo=Rut tien cho ban id ${nameGetConfirm.id_user_money}`}
            width="100%"
            height="100%"
          />
          <br />
          STK Của khách: {nameProfile.payment_bank.more_back.short_name}
          {nameProfile.payment_bank.id_bank}
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
