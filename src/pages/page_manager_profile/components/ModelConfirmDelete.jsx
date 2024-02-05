import { Button, Modal } from "react-bootstrap";
import { deleteIdToken } from "../../../services/ProfileServices";
import { toast } from "react-toastify";

const ModalConfirmDelete = (props) => {
  const { show, handleClose, nameGetDelete, handleUpdateTable } = props;

  const confirmDelete = async () => {
    console.log(`loggg ${nameGetDelete.id}`);
    // const res = await deleteIdToken(nameGetDelete.id);
    // if (res) {
    //   toast.success("Delete Success");
    //   handleUpdateTable();
    //   handleClose();
    // } else {
    //   toast.error("Delete Failed");
    //   handleClose();
    // }
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
            Bạn muốn xoá tài khoản{nameGetDelete.id} ?
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

export default ModalConfirmDelete;
