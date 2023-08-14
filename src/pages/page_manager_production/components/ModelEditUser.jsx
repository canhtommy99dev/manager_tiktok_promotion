/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  uploadImage,
  putInProduction,
  deleteFile,
} from "../../../services/PromotionServices";
import { toast } from "react-toastify";
import "./styles.css";
///
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ModalEditUser = (props) => {
  const { show, handleClose, dataProductEdit, handleUpdateTable } = props;
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [previewImageDidProduct, setPreviewImageDidProducte] =
    useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  ////textEdit
  const [nameProducts, setNameProducts] = useState("");
  const [price, setPrice] = useState("");
  const [commissionDiscount, setCommissionDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);

  // const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (event) => {
    setActive(true);
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const setClose = () => {
    setActive(false);
    setPreviewImage(undefined);
    setPreviewImageDidProducte(undefined);
    setPrice(undefined);
    setCommissionDiscount(undefined);
    setNameProducts(undefined);
    setDescription(undefined);
    setCategory(undefined);
    handleClose();
  };

  const getProductionInApp = () => {
    setPreviewImageDidProducte(dataProductEdit.image);
    setPrice(dataProductEdit.price);
    setCommissionDiscount(dataProductEdit.commission_discount);
    setNameProducts(dataProductEdit.name_product);
    setDescription(dataProductEdit.description);
    setCategory(dataProductEdit.category);
    const result = String(dataProductEdit.image).substring(80, 52);

    console.log(`Link: ${result}`);
  };

  useEffect(() => {
    if (show) {
      getProductionInApp();
    }
  }, [dataProductEdit, show]);

  const upload = async () => {
    const result = String(dataProductEdit.image).substring(80, 52);
    let dataResult = await deleteFile(result);

    console.log("loooo", dataResult);
    setProgress(0);

    uploadImage(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        console.log("looggg", response.link);
        putInProductInApp(
          `https://tiktokshop-promotion.com/api_backend/images${response.link}`
        );
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

  const putInProductInApp = async (imageLink) => {
    const ratting = {
      rate: 0,
      count: 0,
    };
    let responseData = await putInProduction(
      dataProductEdit.id,
      nameProducts,
      price,
      commissionDiscount,
      description,
      category,
      imageLink,
      ratting
    );
    if (responseData && responseData.status) {
      handleClose();
      handleUpdateTable();
      toast.success("A user success");
    } else {
      ///error
      toast.error("A user faliled");
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
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
          <Modal.Title>Add Edit Production</Modal.Title>
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
              </div>
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
            {active === false ? (
              <div>
                <img
                  className="preview"
                  src={previewImageDidProduct}
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
            ) : (
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
                <InputLabel id="demo-simple-select-label">Cấp Bậc</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Cấp bậc"
                  onChange={handleChange}
                >
                  <MenuItem value={"Phổ thông"}>Phổ thông</MenuItem>
                  <MenuItem value={"Tiểu thương"}>Tiểu thương</MenuItem>
                  <MenuItem value={"Thương Gia"}>Thương Gia</MenuItem>
                  <MenuItem value={"Đại lý tiktok"}>Thương Gia</MenuItem>
                  <MenuItem value={"Doanh nghiệp"}>Thương Gia</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setClose()}>
            Đóng
          </Button>
          <Button
            variant="primary"
            disabled={
              nameProducts === "" ||
              price === "" ||
              commissionDiscount === "" ||
              description === "" ||
              category === ""
                ? true
                : false
            }
            onClick={
              active === true
                ? () => upload()
                : () => putInProductInApp(dataProductEdit.image)
            }
          >
            Sửa sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUser;
