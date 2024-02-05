/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import { updateUpdateBankAccount } from "../../../services/ProfileServices";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DropdownScrolling.css";

const ModalEditBankOnCheck = (props) => {
  const {
    show,
    handleClose,
    idGet,
    myJSON,
    handleUpdateTable,
    nameIntentionalUS,
  } = props;
  const [listBankVietNam, setListBankVietNam] = useState();
  const [nameNumberBank, setNameNumberBank] = useState("");
  const [nameAccountBank, setNameAccountBank] = useState("");
  const [nameBankIntetional, setNameBankIntetional] = useState("");
  const [myJSONCheck, setMyJSONCheck] = useState();

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
    setMyJSONCheck(myJSON.more_back);
    setNameNumberBank(myJSON.id_bank);
    setNameAccountBank(myJSON.account_name);
    setNameBankIntetional(JSON.stringify(nameIntentionalUS));
  };
  const closeApp = () => {
    handleClose();
    getLogCheck();
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
    const results = await updateUpdateBankAccount(idGet, myJSONEdit);
    if (results && results.status === "update-success") {
      handleClose();
      handleUpdateTable();
      toast.success(`Bạn đã cập nhật ngân hàng thành công`);
    } else {
      handleClose();
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
    const results = await updateUpdateBankAccount(idGet, myJSONEdit);
    if (results && results.status === "update-success") {
      handleClose();
      handleUpdateTable();
      // toast.success(`Bạn đã cập nhật ngân hàng thành công`);
    } else {
      handleClose();
      // toast.error("Lỗi hệ thống");
    }
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
          <Modal.Title>Chỉnh tài khoản khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <div>
                {myJSON.code_country === "VN" ? (
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
                    {myJSONCheck === undefined ? (
                      <div></div>
                    ) : (
                      <div>
                        <Form.Label htmlFor="inputPassword5">
                          Ngân Hàng Quốc tế
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="inputPassword5"
                          aria-describedby="passwordHelpBlock"
                          value={`${myJSON.more_back.name}`}
                          onChange={(e) =>
                            setNameBankIntetional(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeApp()}>
            Close
          </Button>
          {myJSON.code_country === "VN" ? (
            <div>
              <Button
                variant="primary"
                // disabled={
                //   nameNumberBank.length < 5 || nameAccountBank.length < 5
                //     ? true
                //     : false
                // }
                onClick={sendUpdateAccount()}
              >
                Sửa lại Ngân Hàng
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              // disabled={
              //   nameBankIntetional.length < 2 ||
              //   nameNumberBank.length < 5 ||
              //   nameAccountBank.length < 5
              //     ? true
              //     : false
              // }
              onClick={() => sendAPIToChange()}
            >
              Sửa lại Ngân Hàng
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditBankOnCheck;
