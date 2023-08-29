import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import "./components/styles.css";
import ModalAddNewSlideBanner from "./components/modalAddNewBanner";
import {
  getListNotificationTiktok,
  deleteNotificationTiktok,
} from "../../services/NotificationServices";

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

export default function PageNotification() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [listAPI, setListAPI] = useState([]);
  const getAPISlideBanner = async () => {
    let res = await getListNotificationTiktok();
    setListAPI(res.results);
  };

  const handleCloseShow = () => {
    setIsShowModalAddNew(false);
  };

  const deleteList = async (id) => {
    await deleteNotificationTiktok(id);
    getAPISlideBanner();
  };

  useEffect(() => {
    getAPISlideBanner();
  }, []);

  return (
    <div>
      <br />
      <div className="title_style">
        <h3>Quản lý thông báo</h3>
        <Button variant="contained" onClick={() => setIsShowModalAddNew(true)}>
          Thêm Thông Báo
        </Button>
      </div>
      <hr />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell align="center">Nội dung</TableCell>
              <TableCell align="center">Ngày Đăng</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAPI.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {row.content_notification}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.description_notification}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.date_show}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => deleteList(row.id)}>Xoá</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalAddNewSlideBanner
        show={isShowModalAddNew}
        handleClose={handleCloseShow}
        handleUpdateTable={getAPISlideBanner}
      />
    </div>
  );
}
