import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { uploadImage } from "../../../services/PromotionServices";
import { postListBanner } from "../../../services/SlideAdsEndNow";
import { toast } from "react-toastify";
import "./styles.css";
////
// import Checkbox from "@mui/material/Checkbox";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  ////textEdit
  const [nameTitle, setNameTitle] = useState("");
  const [content, setContent] = useState("");
  // const [vipChange, setVipChange] = useState(false);

  // const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const setClose = () => {
    setPreviewImage(undefined);
    setNameTitle(undefined);
    setContent(undefined);
    handleClose();
  };

  const upload = () => {
    setProgress(0);

    uploadImage(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        console.log("looggg", response.link);
        postInProductInApp(response.link);
      })
      .catch((err) => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the Image!");
        }

        setCurrentFile(undefined);
      });
  };

  const postInProductInApp = async (imageLink) => {
    let responseData = await postListBanner(
      nameTitle,
      `https://tiktokshop-promotion.com/api_backend/images${imageLink}`,
      content
    );
    if (responseData) {
      handleClose();
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
          <Modal.Title>Add New Production</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div className="col-8">
                <label>
                  Chọn Ảnh
                  <input
                    type="file"
                    name="photo"
                    className="upload-photo"
                    onChange={selectFile}
                  />
                </label>
                {/* <label>Browse...</label>
                <input
                  type="file"
                  name="photo"
                  className="upload-photo"
                  onChange={selectFile}
                /> */}
              </div>
              {/* <div className="col-4">
                <button
                  className="btn btn-success btn-sm"
                  disabled={!currentFile}
                  onClick={upload}
                >
                  Upload
                </button>
              </div> */}
            </div>
            {currentFile && (
              <div className="progress my-3">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progress + "%" }}
                >
                  {progress}%
                </div>
              </div>
            )}
            {previewImage && (
              <div>
                <img
                  className="preview"
                  src={previewImage}
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
            )}
            {message && (
              <div className="alert alert-secondary mt-3" role="alert">
                {message}
              </div>
            )}
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
              <label className="form-label">Content</label>
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
            disabled={
              previewImage === undefined || nameTitle === "" || content === ""
                ? true
                : false
            }
            onClick={() => upload()}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNew;
