import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DropdownScrolling.css";
import {
  getUserGuestId,
  updateUpdateBankAccount,
} from "../../services/ProfileServices";
import { toast } from "react-toastify";
import axios from "axios";

export default function PageUpdateBankAccount() {
  let { id } = useParams();

  const [listBankVietNam, setListBankVietNam] = useState();
  const [nameNumberBank, setNameNumberBank] = useState("");
  const [nameAccountBank, setNameAccountBank] = useState("");
  const [nameBankIntetional, setNameBankIntetional] = useState("");
  const [myJSONCheck, setMyJSONCheck] = useState();
  const [countryCode, setCountryCode] = useState("");
  const [showAccount, setShowAccount] = useState(false);

  const getAPIGuest = async () => {
    const resAPI = await getUserGuestId(id);
    if (resAPI.status === "not-found-account") {
      setShowAccount(false);
    } else if (resAPI.status === "success") {
      setShowAccount(true);
      setCountryCode(resAPI.results.payment_bank.code_country);
      setMyJSONCheck(resAPI.results.payment_bank.more_back);
      setNameNumberBank(resAPI.results.payment_bank.id_bank);
      setNameAccountBank(resAPI.results.payment_bank.account_name);
      setNameBankIntetional(resAPI.results.payment_bank.more_back.name);
    }
  };

  const axiosShow = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.vietqr.io/v2/banks",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setListBankVietNam(response.data.data);
        // console.log(listBankVietNam);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLogCheck();
  }, []);

  const getLogCheck = () => {
    axiosShow();
    getAPIGuest();
  };

  const onClickApp = (event) => {
    setMyJSONCheck(event);
    setNameNumberBank("");
    setNameAccountBank("");
  };

  const sendUpdateAccount = async () => {
    console.log(`errrrrr`);
    const myJSONEdit = {
      code_country: "VN",
      account_name: nameAccountBank,
      id_bank: nameNumberBank,
      more_back: myJSONCheck,
    };
    const results = await updateUpdateBankAccount(id, myJSONEdit);
    if (results && results.status === "update-success") {
      toast.success(`Bạn đã cập nhật ngân hàng thành công`);
    } else {
      toast.error("Lỗi hệ thống");
    }
  };

  const sendAPIToChange = async () => {
    console.log(`errrrrr`);
    const myJSONEdit = {
      code_country: "US",
      account_name: nameAccountBank,
      id_bank: nameNumberBank,
      more_back: {
        id: "00",
        name: nameBankIntetional,
        code: "BANKInternational",
        bin: "5555555",
        shortName: "International",
        logo: "5555555",
        transferSupported: 1,
        lookupSupported: 1,
        shortName1: "BANKInternational",
        support: 3,
        isTransfer: 1,
        swiftCode: "XMMLMSCO",
      },
    };
    const results = await updateUpdateBankAccount(id, myJSONEdit);
    if (results && results.status === "update-success") {
      toast.success(`Bạn đã cập nhật ngân hàng thành công`);
      window.location.href = `/profile_guest/${id}`;
    } else {
      toast.error("Lỗi hệ thống");
    }
  };

  return (
    <div>
      <h2>Chỉnh tài khoản khách hàng</h2>
      <h2>ID Khách Hàng: {id}</h2>
      <div>
        {showAccount === true ? (
          <div>
            <h2>Nguồn tài khoản: {countryCode}</h2>
            <div>
              {countryCode === "VN" ? (
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Chọn ngân hàng
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="scrollable-menu">
                      {listBankVietNam.map((item) => (
                        <Dropdown.Item
                          key={item.id}
                          onClick={() => onClickApp(item)}
                        >
                          <img
                            className="circular-image"
                            src={item.logo}
                            alt={item.name}
                          />
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <br />
                  <div className=" flex-column">
                    {myJSONCheck === undefined ? (
                      <div></div>
                    ) : (
                      <div>
                        <img
                          className="circular-image-big"
                          src={myJSONCheck.logo}
                          alt={myJSONCheck.name}
                        />
                        <Form.Label htmlFor="inputPassword5">
                          Ngân Hàng bạn chọn: {myJSONCheck.name} -{" "}
                          {myJSONCheck.shortName}
                        </Form.Label>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <Form.Label htmlFor="inputPassword5">
                    Ngân Hàng Quốc tế
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    value={nameBankIntetional}
                    onChange={(e) => setNameBankIntetional(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <div>
                <br />
                <Form.Label htmlFor="inputPassword5">Số tài khhoản</Form.Label>
                <Form.Control
                  type="text"
                  id="inputPassword5"
                  aria-describedby="passwordHelpBlock"
                  value={nameNumberBank}
                  onChange={(e) => setNameNumberBank(e.target.value)}
                />
                <br />
                <Form.Label htmlFor="inputPassword5">Tên tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  id="inputPassword5"
                  aria-describedby="passwordHelpBlock"
                  value={nameAccountBank}
                  onChange={(e) => setNameAccountBank(e.target.value)}
                />
              </div>
            </div>

            {countryCode === "VN" ? (
              <div>
                <Button
                  variant="primary"
                  disabled={
                    nameNumberBank.length < 5 || nameAccountBank.length < 5
                      ? true
                      : false
                  }
                  onClick={sendUpdateAccount()}
                >
                  Sửa lại Ngân Hàng
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                disabled={
                  nameBankIntetional.length < 2 ||
                  nameNumberBank.length < 5 ||
                  nameAccountBank.length < 5
                    ? true
                    : false
                }
                onClick={() => sendAPIToChange()}
              >
                Sửa lại Ngân Hàng
              </Button>
            )}
          </div>
        ) : (
          <div>
            <h2>Trống dữ liệu</h2>
          </div>
        )}
      </div>
    </div>
  );
}
