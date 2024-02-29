/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  uploadImage,
  postInProduction,
} from "../../services/PromotionServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PageCreateProduction() {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  ////textEdit
  const [nameProducts, setNameProducts] = useState("");
  const [price, setPrice] = useState("");
  const [commissionDiscount, setCommissionDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Phổ thông");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentFile(file);

    if (file) {
      const reader = new FileReader();
      console.log(`looo ${reader}`);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleClickDelete = () => {
    setPreviewImage(null);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const setClose = () => {
    navigate("/product_promotion");
  };

  const upload = () => {
    setProgress(0);

    uploadImage(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        // console.log("looggg", response.link);
        postInProductInApp(response.link);
      })
      .catch((err) => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the Image!");
        }

        setPreviewImage(undefined);
      });
  };

  const postInProductInApp = async (imageLink) => {
    const ratting = {
      rate: 0,
      count: 0,
    };
    let responseData = await postInProduction(
      nameProducts,
      price,
      commissionDiscount,
      description,
      category,
      `https://api.tiktokshop-promotion.com/api/images${imageLink}`,
      ratting
    );
    if (responseData && responseData.status) {
      // toast.success("Add Production Success");
      navigate("/product_promotion");
    } else {
      ///error
      toast.error("Not add Production");
    }
  };
  return (
    <div>
      <div>
        <div className="row">
          <div className="text-center">
            <div className="mb-3">
              {previewImage === null ? (
                <div>
                  <label htmlFor="uploadImage" className="btn btn-primary mt-3">
                    Chọn Ảnh
                  </label>
                  <input
                    type="file"
                    id="uploadImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>

            {previewImage && (
              <div className=" flex-fill   bd-highlight mb-3">
                <img
                  className="preview rounded custom-image-style"
                  src={previewImage}
                  alt=""
                  style={{ width: "600px", height: "400px" }}
                />
                <button
                  className="btn btn-danger ms-2 align-self-start"
                  onClick={() => handleClickDelete()}
                >
                  Xoá
                </button>
              </div>
            )}
          </div>
        </div>
        {previewImage && (
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
        <div className="mb-3">
          <label className="form-label">Cấp bậc</label>
          <select
            class="form-select"
            aria-label="Default select example"
            value={category}
            onChange={handleChange}
          >
            <option value={"Phổ thông"}>Phổ thông</option>
            <option value={"Tiểu thương"}>Tiểu thương</option>
            <option value={"Thương Gia"}>Thương Gia</option>
            <option value={"Đại lý tiktok"}>Đại lý tiktok</option>
            <option value={"Doanh nghiệp"}>Doanh nghiệp</option>
            <option value={"VIP"}>VIP</option>
          </select>
        </div>
        <div className=" d-flex flex-row-reverse">
          <Button variant="secondary" className="" onClick={() => setClose()}>
            Đóng
          </Button>
          <Button
            variant="primary"
            className="  me-2"
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
        </div>
      </div>
    </div>
  );
}
