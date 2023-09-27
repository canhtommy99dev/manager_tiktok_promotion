import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {
  Container,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import "./myCss.css";

import { listUserInHomePagiation } from "../../services/ProfileServices";
import { useEffect } from "react";
import { useState } from "react";
import ModalAddUser from "./components/modalAddUser";

export default function PageManagerProfile() {
  const [listProfile, setListProfile] = useState([]);
  const [nameAccounnt, setNameAccounnt] = useState("");
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);
  const [totalProductPage, setTotalProductPage] = useState(0);

  useEffect(() => {
    getInProlist(1);
  }, []);

  const handleCloseShow = () => {
    setIsShowModalAddUser(false);
    // setIsShowModalEditProduct(false);
    // setIsShowModalDeleteId(false);
  };

  const getInProlist = async (page) => {
    const res = await listUserInHomePagiation(page);
    setListProfile(res.listPage);
    setTotalProductPage(res.totalPages);
  };

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setNameAccounnt(lowerCase);
  };

  const navigate = useNavigate();

  const handleEdit = (getId) => {
    navigate(`/profile_guest/${getId}`);
  };

  // const filteredData = listProfile.filter((itemList) => {
  //   //if no input the return the original
  //   if (nameAccounnt === "") {
  //     return itemList;
  //   }
  //   //return the item which contains the user input
  //   else {
  //     return itemList.phone_number.toLowerCase().includes(nameAccounnt);
  //   }
  // });

  const appEventSearch = () => {
    console.log(`eeee ${nameAccounnt}`);
  };

  const handlePageClick = (event) => {
    getInProlist(event.selected + 1);
  };

  return (
    <div>
      <br />
      <div className="searchText">
        <Container maxWidth="md" sx={{ mt: 0 }}>
          <TextField
            id="search"
            type="search"
            label="Search"
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                appEventSearch();
                ev.preventDefault();
              }
            }}
            onChange={(event) => setNameAccounnt(event.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon onClick={() => appEventSearch()} />
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </div>
      <Button
        variant="contained"
        fullWidth
        onClick={() => setIsShowModalAddUser(true)}
      >
        Thêm Khách Hàng
      </Button>
      <br />
      <br />
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Mã giới thiệu</TableCell>
                <TableCell align="left">Coin</TableCell>
                <TableCell align="left">Họ Và tên</TableCell>
                <TableCell align="left">Địa Chỉ</TableCell>
                <TableCell align="left">Cấp bậc</TableCell>
                <TableCell align="left">Đơn Hàng Vip</TableCell>
                <TableCell align="left">Tiến trình giao dịch</TableCell>
                <TableCell align="left">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProfile.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.phone_number}
                  </TableCell>
                  <TableCell align="left">{item.code_intro}</TableCell>
                  <TableCell align="left">
                    {Number(item.coin_user).toLocaleString("en-US")} VNĐ
                  </TableCell>
                  <TableCell align="left">{item.user_name}</TableCell>
                  <TableCell align="left">{item.address}</TableCell>
                  <TableCell align="left">{item.vip_change}</TableCell>
                  <TableCell align="left">{item.pending_send}</TableCell>
                  <TableCell align="left">
                    {item.dataVipChange.lenghtMatch}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleEdit(item.id)}
                    >
                      Sửa
                    </Button>
                    {"  "}
                    <Button variant="contained" color="success">
                      Xoá
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </div>
      <ModalAddUser
        show={isShowModalAddUser}
        handleClose={handleCloseShow}
        handleUpdateTable={getInProlist}
      />
    </div>
  );
}
