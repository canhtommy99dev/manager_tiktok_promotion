/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserGuestId, postUserAPI } from "../../services/ProfileServices";
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

const PageInfoProfile = () => {
  let { id } = useParams();
  const [statusResults, setStatusResults] = useState("");
  /////
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [setVip, setSetVip] = useState("");
  const [type, setType] = useState("");

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
    setType(resAPI.results.vip_change);
    setStatusResults(resAPI.status);
    // setStatusAPIdata(resAPI.results);
    // setUserProfile(statusAPIdata);
  };

  const handleSumbit = async () => {
    let resAPI = await postUserAPI(id, userName, phoneNumber, setType);
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
    let resAPI = await getProductionInCode("321");
    setListProductVip(resAPI.results);
  };

  const getVipAdd = async () => {
    let resAPI = await getListVipGet(id);
    setLstVipAdd(resAPI.results);
  };

  const handleClickDelete = async (id) => {
    let resAPI = await deleteAPiViper(id);
    getVipAdd();
  };

  return (
    <div>
      <Button onClick={() => handleBack()}>Quay lại</Button>
      <h2>Thông tin: {id}</h2>
      {statusResults === "not-found-account" ? (
        <NotFound />
      ) : (
        <div>
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
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="Phổ Thông">Phổ Thông</option>
                <option value="Tiểu Thương">Tiểu Thương</option>
                <option value="Thương Gia">Thương Gia</option>
                <option value="Đại Lý Tiktok">Đại Lý Tiktok</option>
                <option value="Doanh Nghiệp">Doanh Nghiệp</option>
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
    </div>
  );
};

export default PageInfoProfile;
