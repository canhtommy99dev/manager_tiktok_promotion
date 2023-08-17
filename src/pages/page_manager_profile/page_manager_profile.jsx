import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./myCss.css";

import { getProfileList } from "../../services/ProfileServices";
import { useEffect } from "react";
import { useState } from "react";
import ModalAddUser from "./components/modalAddUser";

export default function PageManagerProfile() {
  const [listProfile, setListProfile] = useState([]);
  const [nameAccounnt, setNameAccounnt] = useState("");
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);

  useEffect(() => {
    getInProlist();
  });

  const handleCloseShow = () => {
    setIsShowModalAddUser(false);
    // setIsShowModalEditProduct(false);
    // setIsShowModalDeleteId(false);
  };

  const getInProlist = async () => {
    const res = await getProfileList();
    setListProfile(res.results);
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

  const filteredData = listProfile.filter((itemList) => {
    //if no input the return the original
    if (nameAccounnt === "") {
      return itemList;
    }
    //return the item which contains the user input
    else {
      return itemList.phone_number.toLowerCase().includes(nameAccounnt);
    }
  });

  return (
    <div>
      <br />
      <div className="searchText">
        <TextField
          id="search-bar"
          className="text"
          label="Tìm User Name"
          variant="outlined"
          placeholder="Tìm..."
          size="small"
          fullWidth
          onChange={inputHandler}
        />
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
                <TableCell align="left">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.phone_number}
                  </TableCell>
                  <TableCell align="left">{item.code_intro}</TableCell>
                  <TableCell align="left">{item.coin_user}</TableCell>
                  <TableCell align="left">{item.user_name}</TableCell>
                  <TableCell align="left">{item.address}</TableCell>
                  <TableCell align="left">{item.pending_send}</TableCell>
                  <TableCell align="left">{item.pending_send}</TableCell>
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
      </div>
      <ModalAddUser
        show={isShowModalAddUser}
        handleClose={handleCloseShow}
        handleUpdateTable={getInProlist}
      />
    </div>
  );
}
