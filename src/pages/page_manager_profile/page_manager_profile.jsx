import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Container, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "./myCss.css";

import { getProfileList } from "../../services/ProfileServices";
import { useEffect } from "react";
import { useState } from "react";

export default function PageManagerProfile() {
  const [listProfile, setListProfile] = useState([]);
  const [nameAccounnt, setNameAccounnt] = useState("");

  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }
  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9),
  // ];

  useEffect(() => {
    getInProlist();
  });

  const getInProlist = async () => {
    const res = await getProfileList();
    setListProfile(res.results);
  };

  // const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];.

  // const handleChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const getResults = () => {
    console.log("Hello kkk,", nameAccounnt);
  };

  return (
    <div>
      <br />
      {/* <Container maxWidth="md" sx={{ mt: 3 }}>
        <TextField
          id="search"
          type="search"
          label="Search"
          value={nameAccounnt}
          onChange={(event) => setNameAccounnt(event.target.value)}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <IconButton aria-label="delete" onClick={() => getResults()}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />

      </Container> */}
      <div className="searchText">
        <TextField
          id="search-bar"
          className="text"
          label="Enter a city name"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>
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
              {listProfile.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.code_intro}</TableCell>
                  <TableCell align="left">{item.coin_user}</TableCell>
                  <TableCell align="left">{item.user_name}</TableCell>
                  <TableCell align="left">{item.address}</TableCell>
                  <TableCell align="left">{item.pending_send}</TableCell>
                  <TableCell align="left">{item.pending_send}</TableCell>
                  <TableCell align="left">
                    <Button variant="contained" color="success">
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
    </div>
  );
}
