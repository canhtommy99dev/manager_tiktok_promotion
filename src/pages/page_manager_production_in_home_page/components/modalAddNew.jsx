import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  uploadImage,
  postInProduction,
} from "../../../services/PromotionServiceHomePage";
import { toast } from "react-toastify";
import "./styles.css";
////
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  ////textEdit
  const [nameProducts, setNameProducts] = useState("");
  const [price, setPrice] = useState("");
  const [commissionDiscount, setCommissionDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // const [vipChange, setVipChange] = useState(false);

  // const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const setClose = () => {
    setPreviewImage(undefined);
    setPrice(undefined);
    setCommissionDiscount(undefined);
    setNameProducts(undefined);
    setDescription(undefined);
    setCategory(undefined);
    handleClose();
  };

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    const ratting = {
      rate: randomNumberInRange(1, 5),
      count: randomNumberInRange(1000, 5000),
    };
    let responseData = await postInProduction(
      nameProducts,
      price,
      commissionDiscount,
      description,
      category,
      `https://tiktokshop-promotion.com/api_backend/images${imageLink}`,
      ratting
    );
    if (responseData && responseData.status) {
      handleClose();
      handleUpdateTable();
      toast.success("A product success");
    } else {
      ///error
      toast.error("A product faliled");
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
              <label className="form-label">Tên Sản Phẩm</label>
              <input
                type="text"
                className="form-control"
                value={nameProducts}
                onChange={(event) => setNameProducts(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Giá Sản Phẩm (VND)</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hoa Hồng (VND)</label>
              <input
                type="number"
                className="form-control"
                value={commissionDiscount}
                onChange={(event) => setCommissionDiscount(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nội Dung Sản Phẩm</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Danh Mục"
                  onChange={handleChange}
                >
                  <MenuItem value={"Thời trang"}>Thời trang </MenuItem>
                  <MenuItem value={"Mỹ phẩm"}>Mỹ phẩm </MenuItem>
                  <MenuItem value={"Đồ ăn, đồ uống"}>Đồ ăn, đồ uống </MenuItem>
                  <MenuItem value={"Đồ decor nhà cửa"}>
                    Đồ decor nhà cửa
                  </MenuItem>
                  <MenuItem value={"Đồ gia dụng"}>Đồ gia dụng</MenuItem>
                  <MenuItem value={"Phụ kiện điện thoại"}>
                    Phụ kiện điện thoại
                  </MenuItem>
                  <MenuItem value={"Đồ điện tử"}>Đồ điện tử</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <Checkbox
              {...label}
              defaultChecked={vipChange}
              onClick={() => setVipChange(true)}
            /> */}
            {/* <div className="mb-3">
              <label className="form-label">Cấp bậc</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div> */}
            {/* <div className="card mt-3">
              <div className="card-header">List of Images</div>
              <ul className="list-group list-group-flush">
                {imageInfos &&
                  imageInfos.map((img, index) => (
                    <li className="list-group-item" key={index}>
                      <p>
                        <a href={img.url}>{img.name}</a>
                      </p>
                      <img src={img.url} alt={img.name} height="80px" />
                    </li>
                  ))}
              </ul>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setClose()}>
            Đóng
          </Button>
          <Button
            variant="primary"
            disabled={
              previewImage === undefined ||
              nameProducts === "" ||
              price === "" ||
              commissionDiscount === "" ||
              description === "" ||
              category === ""
                ? true
                : false
            }
            onClick={() => upload()}
          >
            Thêm Sản Phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNew;
