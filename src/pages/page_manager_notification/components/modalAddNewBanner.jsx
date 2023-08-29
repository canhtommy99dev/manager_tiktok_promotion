import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { insertNotificaitonTiktok } from "../../../services/NotificationServices";
import { toast } from "react-toastify";
import "./styles.css";
////
// import Checkbox from "@mui/material/Checkbox";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  ////textEdit
  const [nameTitle, setNameTitle] = useState("");
  const [content, setContent] = useState("");

  const setClose = () => {
    setNameTitle(undefined);
    setContent(undefined);
    handleClose();
  };

  const postInProductInApp = async () => {
    let responseData = await insertNotificaitonTiktok(nameTitle, content);
    if (responseData) {
      setClose();
      handleUpdateTable();
      toast.success("A user success");
    } else {
      ///error
      toast.error("A user faliled");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={() => setClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Tên Tiêu Đề</label>
              <input
                type="text"
                className="form-control"
                value={nameTitle}
                onChange={(event) => setNameTitle(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nội Dung</label>
              <input
                type="text"
                className="form-control"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setClose()}>
            Đóng
          </Button>
          <Button
            variant="primary"
            disabled={nameTitle === "" || content === "" ? true : false}
            onClick={() => postInProductInApp()}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNew;
