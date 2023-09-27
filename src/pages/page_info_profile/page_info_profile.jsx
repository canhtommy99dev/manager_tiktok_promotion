/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getUserGuestId,
  postUserAPI,
  updatePasswordPin,
  updatePasswordkey,
  updateResetBank,
} from "../../services/ProfileServices";
import { getProductionInCode } from "../../services/PromotionServices";
import {
  getListVipGet,
  postUserViper,
  deleteAPiViper,
} from "../../services/ServiceVipTiktok";
import Table from "react-bootstrap/Table";
///
import Form from "react-bootstrap/Form";
import NotFound from "../NotFound/NotFound";
import { toast } from "react-toastify";
import ModalAddMoney from "./components/modalAddMoney";
import ModalPasswordNew from "./components/modalPasswordNew";
import ModalUpdateMoney from "./components/modalEditMoney";

const PageInfoProfile = () => {
  let { id } = useParams();
  const [statusResults, setStatusResults] = useState("");
  const [isShowModalAddPrice, setIsShowModalAddPrice] = useState(false);
  const [isShowModalUpdatePrice, setIsShowModalUpdatePrice] = useState(false);
  const [isShowModalPassword, setIsShowModalPassword] = useState(false);
  /////
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  // const [setVip, setSetVip] = useState("");
  const [typeSet, setTypeSet] = useState("");
  const [price, setPrice] = useState("");

  /////
  const [listProductVip, setListProductVip] = useState([]);
  const [lstVipAdd, setLstVipAdd] = useState([]);
  const [typeVip, setTypeVip] = useState("");
  const [levelVip, setLevelVip] = useState(0);

  //   "username": "Canh MC",
  // "phone_number": "0356738683",
  // "image_link": "null",
  // "set_vip":"Thương Mại"
  const navigate = useNavigate();

  /// form

  const handleBack = () => {
    navigate("/manager_profile");
  };

  const handleCloseShow = () => {
    setIsShowModalAddPrice(false);
    setIsShowModalPassword(false);
    setIsShowModalUpdatePrice(false);
  };

  useEffect(() => {
    getAPIGuest();
    getAPIProductVIP();
    getVipAdd();
  }, []);

  const getAPIGuest = async () => {
    const resAPI = await getUserGuestId(id);
    // console.log("hhhhhhh", resAPI.results.user_name);
    setUserName(resAPI.results.user_name);
    setPhoneNumber(resAPI.results.phone_number);
    setTypeSet(resAPI.results.vip_change);
    setPrice(resAPI.results.coin_user);
    setStatusResults(resAPI.status);
    // setStatusAPIdata(resAPI.results);
    // setUserProfile(statusAPIdata);
  };

  const handleSumbit = async () => {
    let resAPI = await postUserAPI(id, userName, phoneNumber, typeSet);
    console.log("res", resAPI);
    toast.success("Bạn đã cập nhật thành công");
  };

  const handleSumbitVip = async () => {
    let resAPI = await postUserViper(typeVip, id, levelVip);
    console.log("res", resAPI);
    toast.success("Bạn đã cập nhật thành công");

    getVipAdd();
  };

  const getAPIProductVIP = async () => {
    let resAPI = await getProductionInCode("VIP");
    setListProductVip(resAPI.results);
  };

  const getVipAdd = async () => {
    let resAPI = await getListVipGet(id);
    setLstVipAdd(resAPI.results);
  };

  const handleClickDelete = async (id) => {
    await deleteAPiViper(id);
    getVipAdd();
  };

  const newPasswordReset = async (id) => {
    const PassNew = makeid(8);
    setPasswordNew(`${PassNew}`);
    let resAPI = await updatePasswordkey(id, PassNew);
    if (resAPI) {
      setIsShowModalPassword(true);
    }
  };

  const newPassPin = async (id) => {
    let resAPI = await updatePasswordPin(id);
    if (resAPI) {
      toast.success("Bạn đã Reset Mã Pin");
    }
  };

  const resetBank = async (id) => {
    let resAPI = await updateResetBank(id);
    if (resAPI) {
      toast.success("Bạn đã Reset Ngân Hàng");
    }
  };

  function makeid(length) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div>
      <Button onClick={() => handleBack()}>Quay lại</Button>
      <h2>Thông tin: {id}</h2>
      {statusResults === "not-found-account" ? (
        <NotFound />
      ) : (
        <div>
          <h2>Coin: {Number(price).toLocaleString("en-US")} VNĐ</h2>
          <Form>
            <Form.Group>
              <Form.Label>Họ và tên:</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Nhập tên khách"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Số điện thoại:</Form.Label>
              <Form.Control
                type="number"
                co
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicSelect">
              <Form.Label>Sét hạng</Form.Label>
              <Form.Control
                as="select"
                value={typeSet}
                onChange={(e) => {
                  setTypeSet(e.target.value);
                }}
              >
                <option value="Thành viên mới">Thành viên mới</option>
                <option value="Phổ thông">Phổ thông</option>
                <option value="Tiểu thương">Tiểu thương</option>
                <option value="Thương Gia">Thương Gia</option>
                <option value="Đại lý tiktok">Đại lý tiktok</option>
                <option value="Doanh nghiệp">Doanh nghiệp</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="contained"
              onClick={() => handleSumbit()}
              type="submit"
              fullWidth
            >
              Cập nhật
            </Button>
          </Form>
          <hr />
          <div
            sx={{
              display: "flex",
            }}
          >
            {" "}
            <Button
              variant="contained"
              onClick={() => setIsShowModalAddPrice(true)}
              type="submit"
            >
              Nạp tiền
            </Button>
            {"  "}
            <Button
              variant="contained"
              type="submit"
              onClick={() => setIsShowModalUpdatePrice(true)}
            >
              Chỉnh tiền cho khách
            </Button>
            {"  "}
            <Button
              variant="contained"
              type="submit"
              onClick={() => newPassPin(id)}
            >
              Reset Mã PIN
            </Button>
            {"  "}
            <Button
              variant="contained"
              type="submit"
              onClick={() => newPasswordReset(id)}
            >
              Reset Mật Khẩu
            </Button>
            {"  "}
            <Button
              variant="contained"
              type="submit"
              onClick={() => resetBank(id)}
            >
              Reset Ngân Hàng
            </Button>
          </div>

          <hr />

          <Form.Group controlId="formBasicSelect">
            <Form.Label>Gài đơn VIP</Form.Label>
            <Form.Control
              as="select"
              value={typeVip}
              onChange={(e) => {
                setTypeVip(e.target.value);
              }}
            >
              {listProductVip.map((e) => {
                return (
                  <option value={e.id}>
                    {e.name_product} - {e.price}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <br />
          <Form.Group>
            <Form.Label>Cài thứ:</Form.Label>
            <Form.Control
              type="number"
              co
              placeholder="Cài Số Vip"
              value={levelVip}
              onChange={(event) => setLevelVip(event.target.value)}
            />
          </Form.Group>
          <Button
            variant="contained"
            onClick={() => handleSumbitVip()}
            type="submit"
            fullWidth
          >
            Xác nhận gài Vip
          </Button>
          <br />
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Sản phẩm gắn</th>
                <th>Sắp Sếp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lstVipAdd &&
                lstVipAdd.length > 0 &&
                lstVipAdd.map((item, index) => {
                  return (
                    <tr key={`user-${index}`}>
                      <td>{item.id}</td>
                      <td>{item.id_promotion_vip}</td>
                      <td>{item.sort}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleClickDelete(item.id)}
                        >
                          Xoá đơn vip
                        </Button>{" "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      )}
      <ModalAddMoney
        idGet={id}
        show={isShowModalAddPrice}
        handleClose={handleCloseShow}
        handleUpdateTable={getAPIGuest}
      />
      <ModalPasswordNew
        idGet={id}
        show={isShowModalPassword}
        handleClose={handleCloseShow}
        phoneNumber={phoneNumber}
        passwordReset={passwordNew}
      />
      <ModalUpdateMoney
        idGet={id}
        show={isShowModalUpdatePrice}
        priceChange={price}
        handleClose={handleCloseShow}
        handleUpdateTable={getAPIGuest}
      />
    </div>
  );
};

export default PageInfoProfile;
