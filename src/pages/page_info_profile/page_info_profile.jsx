/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getUserGuestId,
  postUserAPI,
  updatePasswordPin,
  updatePasswordkey,
  updateResetBank,
} from "../../services/ProfileServices";
import {
  getPageTransactionId,
  deleteRandomOrder,
} from "../../services/TransactionService";
import { getProductionInCode } from "../../services/PromotionServices";
import {
  getListVipGet,
  postUserViper,
  deleteAPiViper,
} from "../../services/ServiceVipTiktok";
import { Table, Tabs, Tab, Button } from "react-bootstrap";
///
import Form from "react-bootstrap/Form";
import NotFound from "../NotFound/NotFound";
import { toast } from "react-toastify";
import ModalAddMoney from "./components/modalAddMoney";
import ModalPasswordNew from "./components/modalPasswordNew";
import ModalUpdateMoney from "./components/modalEditMoney";
import ModalProductionCheck from "./components/modalProductIdCheck";
// import ModalEditBankOnCheck from "./components/modamEditBankOnCheck";

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
  const [lenghtMatch, setLenghtMatch] = useState("");
  const [paymentBank, setPaymentBank] = useState({});

  /////
  const [listProductVip, setListProductVip] = useState([]);
  const [lstVipAdd, setLstVipAdd] = useState([]);
  const [typeVip, setTypeVip] = useState("");
  const [levelVip, setLevelVip] = useState(0);

  /////
  const [pages, setPages] = useState(0);
  const [totalsPages, setTotalsPages] = useState(0);
  const [listPages, setListPages] = useState([]);
  const [modalCheckProduction, setModalCheckProduction] = useState(false);
  const [myProduction, setMyProduction] = useState({});

  const navigate = useNavigate();

  /// form

  const handleBack = () => {
    navigate("/manager_profile");
  };

  const handleCloseShow = () => {
    setIsShowModalAddPrice(false);
    setIsShowModalPassword(false);
    setIsShowModalUpdatePrice(false);
    setModalCheckProduction(false);
  };

  useEffect(() => {
    getAPIGuest();
    getAPIProductVIP();
    getVipAdd();
    getAPITransactionShow(1);
  }, []);

  const getAPITransactionShow = async (page) => {
    const restAPI = await getPageTransactionId(id, page);
    if (restAPI) {
      setPages(restAPI.page);
      setTotalsPages(restAPI.totalPages);
      setListPages(restAPI.listPage);
    }
  };

  const getAPIGuest = async () => {
    const resAPI = await getUserGuestId(id);
    // console.log("hhhhhhh", resAPI.results.user_name);
    setUserName(resAPI.results.user_name);
    setPhoneNumber(resAPI.results.phone_number);
    setTypeSet(resAPI.results.vip_change);
    setPrice(resAPI.results.coin_user);
    setStatusResults(resAPI.status);
    setPaymentBank(resAPI.results.payment_bank);
    setLenghtMatch(resAPI.results.dataVipChange.lenghtMatch);
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
      getAPIGuest();
      toast.success("Bạn đã Reset Ngân Hàng");
    }
  };

  const handleUpdateBank = async (row) => {
    window.location.href = `/page_update_bank/${row}`;
  };

  const handleResetRandomButton = async () => {
    let resAPI = await deleteRandomOrder(id);
    if (resAPI) {
      toast.success("Bạn đã Reset Đơn Hàng Hôm Nay");
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

  const handleClickShowProduction = (myJSON) => {
    setMyProduction(myJSON);
    setModalCheckProduction(true);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleBack()}>
        Quay lại
      </button>
      <h2>Thông tin: {id}</h2>
      {statusResults === "not-found-account" ? (
        <NotFound />
      ) : (
        <div>
          <h2>Coin: {Number(price).toLocaleString("en-US")} VNĐ</h2>
          <h2>Xếp hạng quay đơn: {lenghtMatch}</h2>
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
            <button
              className="btn btn-primary w-100"
              onClick={() => handleSumbit()}
              type="submit"
            >
              Cập nhật
            </button>
          </Form>
          <hr />
          <div
            sx={{
              display: "flex",
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => setIsShowModalAddPrice(true)}
              type="submit"
            >
              Nạp tiền
            </button>
            <button
              className="btn btn-primary mx-2"
              type="submit"
              onClick={() => setIsShowModalUpdatePrice(true)}
            >
              Chỉnh tiền cho khách
            </button>
            <button
              className="btn btn-primary mx-2"
              type="submit"
              onClick={() => newPassPin(id)}
            >
              Reset Mã PIN
            </button>
            <button
              className="btn btn-primary mx-2"
              type="submit"
              onClick={() => newPasswordReset(id)}
            >
              Reset Mật Khẩu
            </button>
            <button
              className="btn btn-primary mx-2"
              type="submit"
              onClick={() => resetBank(id)}
            >
              Reset Ngân Hàng
            </button>
            <button
              className="btn btn-primary mx-2"
              type="submit"
              onClick={() => handleResetRandomButton(id)}
            >
              Reset Đơn Hàng Hôm Nay
            </button>
            {paymentBank.account_name === undefined ? (
              <></>
            ) : (
              <button
                className="btn btn-primary mx-2"
                type="submit"
                onClick={() => handleUpdateBank(id)}
              >
                Sửa tài khoản ngân hàng
              </button>
            )}
          </div>
          <hr />
          {paymentBank.account_name === undefined ? (
            <>
              <p>Chưa có tài khoản</p>
            </>
          ) : (
            <div>
              Tên tài khoản: {paymentBank.account_name}
              <br />
              Số tài khoản: {paymentBank.id_bank}
              <br />
              Ngân hàng: {paymentBank.more_back.name} -{" "}
              {paymentBank.more_back.shortName}
            </div>
          )}
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
          <button
            className="btn btn-primary w-100"
            onClick={() => handleSumbitVip()}
            type="submit"
          >
            Xác nhận gài Vip
          </button>
          <Tabs defaultActiveKey="tab1" id="tabs">
            <Tab eventKey="tab1" title="Quản Lý Vip">
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
                            <button
                              className="btn btn-danger"
                              onClick={() => handleClickDelete(item.id)}
                            >
                              Xoá đơn vip
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="tab2" title="Quản lý đơn quay">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Trạng thái</th>
                    <th>Số tiền</th>
                    <th>Hoa Hồng</th>
                    <th>Tổng tiền</th>
                    <th>Id Sản Phẩm</th>
                    <th>Ngày giao dịch</th>
                    <th>Xem</th>
                  </tr>
                </thead>
                <tbody>
                  {listPages &&
                    listPages.length > 0 &&
                    listPages.map((item, index) => {
                      return (
                        <tr key={`user-${index}`}>
                          <td>{item.id_generation}</td>
                          <td>{item.status}</td>
                          <td>{item.price_transaction}</td>
                          <td>{item.discount}</td>
                          <td>{item.price_transaction + item.discount}</td>
                          <td>{item.id_production}</td>
                          <td>{item.date_create_at}</td>
                          <td>
                            <Button
                              className={`btn  w-100 btn-primary`}
                              disabled={
                                item.getProduction.status === "not-found"
                                  ? true
                                  : false
                              }
                              onClick={() =>
                                handleClickShowProduction(
                                  item.getProduction.results
                                )
                              }
                            >
                              Xem Sản Phẩm
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
          <br />
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
      <ModalProductionCheck
        show={modalCheckProduction}
        handleClose={handleCloseShow}
        idProduction={myProduction}
      />
    </div>
  );
};

export default PageInfoProfile;
