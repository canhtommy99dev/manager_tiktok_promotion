/* eslint-disable jsx-a11y/alt-text */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalProductionCheck(props) {
  const { show, handleClose, idProduction } = props;
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{idProduction.name_product}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={idProduction.image}
            className=" w-100 h-25 rounded-6 mb-4"
          />
          <p>Tên sản phẩm: {idProduction.name_product}</p>
          <p>
            Giá tiền: {Number(idProduction.price).toLocaleString("en-US")} VNĐ
          </p>
          <p>
            Giá tiền:{" "}
            {Number(idProduction.commission_discount).toLocaleString("en-US")}{" "}
            VNĐ
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
