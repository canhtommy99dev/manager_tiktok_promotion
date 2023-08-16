import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { post } from "../";
import { toast } from "react-toastify";
import { postPriceMoney } from "../../../services/ProfileServices";

const ModalAddMoney = (props) => {
  const { show, handleClose, idGet, handleUpdateTable } = props;
  const [price, setPrice] = useState(0);
  const handleSaveUser = async () => {
    let res = await postPriceMoney(idGet, price, "add");
    if (res) {
      handleClose();
      setPrice(0);
      handleUpdateTable();
      toast.success(
        `A đã nạp cho khách thành công với số tiền ${Number(
          price
        ).toLocaleString("en-US")}VNĐ`
      );
    } else {
      ///error
      toast.error("A user faliled");
    }
  };

  const closeApp = () => {
    handleClose();
    setPrice(0);
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
          <Modal.Title>Bạn nạp số tiền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">Giá tiền nạp</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              <br />
              <label className="form-label">
                {" "}
                {Number(price).toLocaleString("en-US")} VNĐ
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeApp()}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={price.length < 5 ? true : false}
            onClick={() => handleSaveUser()}
          >
            Nạp tiền
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddMoney;
