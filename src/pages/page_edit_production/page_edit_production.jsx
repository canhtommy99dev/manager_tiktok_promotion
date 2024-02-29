/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  uploadImage,
  putInProduction,
  getIdProduction,
} from "../../services/PromotionServices";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export default function PageEditProduction() {
  let { id } = useParams();
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageString, setPreviewImageString] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  ////textEdit
  const [nameProducts, setNameProducts] = useState("");
  const [statusShow, setStatusShow] = useState("");
  const [price, setPrice] = useState("");
  const [commissionDiscount, setCommissionDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      // setPreviewImage(null);
    }
  };

  const handleClickDelete = () => {
    setPreviewImage(previewImageString);
    setCurrentFile(undefined);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const setClose = () => {
    navigate("/product_promotion");
  };

  useEffect(() => {
    handleGetId();
  }, []);

  const handleGetId = async () => {
    let responseData = await getIdProduction(id);
    setStatusShow(responseData.status);
    if (responseData.status === "success") {
      setPreviewImage(responseData.results.image);
      setPreviewImageString(responseData.results.image);
      setNameProducts(responseData.results.name_product);
      setPrice(responseData.results.price);
      setCommissionDiscount(responseData.results.commission_discount);
      setDescription(responseData.results.description);
      setCategory(responseData.results.category);
    } else if (responseData.status === "failed") {
    }
  };
  // const uploadWithDelete = async () => {
  //   const imageName = previewImageString.substring(
  //     previewImageString.lastIndexOf("/") + 1
  //   );
  //   let data = JSON.stringify({
  //     image: "image-1694629528158.jpg",
  //   });

  //   let config = {
  //     method: "delete",
  //     maxBodyLength: Infinity,
  //     url: "https://api.tiktokshop-promotion.com/api/delefile",
  //     headers: {
  //       authority: "api.tiktokshop-promotion.com",
  //       accept: "application/json, text/plain, */*",
  //       "accept-language":
  //         "vi-VN,vi;q=0.9,ko-KR;q=0.8,ko;q=0.7,fr-FR;q=0.6,fr;q=0.5,en-US;q=0.4,en;q=0.3",
  //       origin: "http://localhost:3000",
  //       referer: "http://localhost:3000/",
  //       "sec-ch-ua":
  //         '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
  //       "sec-ch-ua-mobile": "?0",
  //       "sec-ch-ua-platform": '"macOS"',
  //       "sec-fetch-dest": "empty",
  //       "sec-fetch-mode": "cors",
  //       "sec-fetch-site": "cross-site",
  //       "user-agent":
  //         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       uploadImageUpdate();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const uploadImageUpdate = () => {
    setProgress(0);

    uploadImage(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        // console.log("looggg", response.link);
        handleUpdateWithImage(response.link);
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

  const handleUpdateWithImage = async (imagelink) => {
    const ratting = {
      rate: 0,
      count: 0,
    };
    let responseData = await putInProduction(
      id,
      nameProducts,
      price,
      commissionDiscount,
      description,
      category,
      `https://api.tiktokshop-promotion.com/api/images${imagelink}`,
      ratting
    );
    if (responseData && responseData.status) {
      navigate("/product_promotion");
    } else {
      ///error
      toast.error("Not add Production");
    }
  };

  const handleUpdate = async () => {
    const ratting = {
      rate: 0,
      count: 0,
    };
    let responseData = await putInProduction(
      id,
      nameProducts,
      price,
      commissionDiscount,
      description,
      category,
      previewImageString,
      ratting
    );
    if (responseData && responseData.status) {
      navigate("/product_promotion");
    } else {
      ///error
      toast.error("Not add Production");
    }
  };

  return (
    <div>
      <h2 className=" mt-3">Cập nhật Sản phẩm: {id}</h2>
      {statusShow === "failed" ? (
        <div className=" flex-fill justify-content-center">
          <h2>Trống Dữ Liệu</h2>
          <Button variant="secondary" className="" onClick={() => setClose()}>
            Đóng
          </Button>
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="text-center">
              {previewImage && (
                <div className=" flex-fill bd-highlight mb-3">
                  <img
                    className="preview rounded custom-image-style"
                    src={previewImage}
                    alt=""
                    style={{ width: "600px", height: "400px" }}
                  />
                  <br />
                  {currentFile === undefined ? (
                    <div>
                      <label
                        htmlFor="uploadImage"
                        className="btn btn-primary ms-2 align-self-start mt-3"
                      >
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
                    <button
                      className="btn btn-danger ms-2 align-self-start"
                      onClick={() => handleClickDelete()}
                    >
                      Xoá
                    </button>
                  )}
                </div>
              )}
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
            {currentFile === undefined ? (
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
                onClick={() => handleUpdate()}
              >
                Cập nhật sản phẩm
              </Button>
            ) : (
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
                onClick={() => uploadImageUpdate()}
              >
                Cập nhật sản phẩm + Ảnh Mới
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
