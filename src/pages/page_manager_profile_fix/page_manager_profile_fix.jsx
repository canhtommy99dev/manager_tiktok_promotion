/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import {
  listUserInHomePagiationKeyword,
  // deleteIdToken,
} from "../../services/ProfileServices";
import ModalConfirmDelete from "./components/ModelConfirmDelete";
import ModalAddUser from "./components/modalAddUser";

export default function PageManagerProfileFix() {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [nameAccounnt, setNameAccounnt] = useState("");
  const [totalProductPage, setTotalProductPage] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);
  const [dataGetEdit, setdataGetEdit] = useState({});

  useEffect(() => {
    fetchData(1, "");
  }, []);

  const fetchData = async (page, search) => {
    const res = await listUserInHomePagiationKeyword(page, search);
    setDataList(res.listPage);
    setTotalProductPage(res.totalPages);
  };

  const handlePageClick = (event) => {
    fetchData(event.selected + 1, nameAccounnt);
  };

  const handleEdit = (getId) => {
    navigate(`/profile_guest/${getId}`);
  };

  const appEventSearch = () => {
    fetchData(1, `${nameAccounnt}`);
  };

  const appClearSearch = () => {
    setNameAccounnt("");
    fetchData(1, "");
  };

  const handleClose = () => {
    setShowDelete(false);
    setIsShowModalAddUser(false);
  };

  const handleConfirmDelete = (getId) => {
    setdataGetEdit(getId);
    setShowDelete(true);
  };

  return (
    <div>
      <div className="container mt-4">
        <Button
          variant="primary"
          className=" w-100"
          onClick={() => setIsShowModalAddUser(true)}
        >
          Tạo Tài Khoản
        </Button>{" "}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control me-3 mt-3"
            placeholder="Search..."
            value={nameAccounnt}
            onChange={(event) => setNameAccounnt(event.target.value)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                appEventSearch();
                ev.preventDefault();
              }
            }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary me-2 pb-3"
              onClick={() => appEventSearch()}
            >
              Tìm Kiếm
            </button>
            <button
              className="btn btn-danger  pb-3"
              onClick={() => appClearSearch()}
            >
              Xoá tìm kiếm
            </button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Mã giới thiệu</th>
              <th>Coin</th>
              <th>Họ Và tên</th>
              <th>Địa Chỉ</th>
              <th>Cấp bậc</th>
              <th>Đơn Hàng Vip</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => {
              return (
                <tr>
                  <td component="th" scope="row" key={item.id}>
                    {item.phone_number}
                  </td>
                  <td>{item.code_intro}</td>
                  <td>{Number(item.coin_user).toLocaleString("en-US")} VNĐ</td>
                  <td>{item.user_name}</td>
                  <td>{item.address}</td>
                  <td>{item.vip_change}</td>
                  <td>{item.pending_send}</td>
                  <td className="d-inline-flex p-2 bd-highlight">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleConfirmDelete(item)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <ReactPaginate
          nextLabel="Sau"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalProductPage}
          previousLabel="Trước"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
        <ModalConfirmDelete
          show={showDelete}
          handleClose={handleClose}
          nameGetDelete={dataGetEdit}
          handleUpdateTable={() => appClearSearch()}
        />
        <ModalAddUser
          show={isShowModalAddUser}
          handleClose={() => handleClose()}
          handleUpdateTable={() => appClearSearch()}
        />
      </div>
    </div>
  );
}
