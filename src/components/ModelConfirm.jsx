import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../services/UserServices";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, nameGetDelete } = props;

  const confirmDelete = async () => {
    const res = await deleteUser(nameGetDelete.id);
    if (res && +res.statusCode === 204) {
      toast.success("Delete Success");
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
          <Modal.Title>Bạn muốn xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Bạn muốn xoá 1 hàng {nameGetDelete.email} ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
