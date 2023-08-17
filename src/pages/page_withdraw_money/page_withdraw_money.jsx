import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import "./components/styles.css";

import { getListMoneyWithDraw } from "../../services/HistoryTransaction";
import ModalConfirmPaymentGuestWithdraw from "./components/ModelConfirmPaymentGuestWithdraw";

export default function PageWithDrawMoney() {
  const [listPriceWithDraw, setListPriceWithDraw] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataGetEdit, setdataGetEdit] = useState({});
  const [dataGetNameBank, setDataGetNameBank] = useState("");
  const [idBankName, setBankName] = useState("");

  useEffect(() => {
    getAPIPrice();
  }, []);

  const getAPIPrice = async () => {
    let resPrice = await getListMoneyWithDraw();
    setListPriceWithDraw(resPrice.results);
  };

  // const getOpenChange = () => {

  // }

  const getPriceIdWithDraw = async (row) => {
    setdataGetEdit(row);
    setDataGetNameBank(row.payment_bank.id_bank);
    setBankName(row.payment_bank.more_back.code);
    setIsShowModal(true);
    // console.log("mmmmm", res.results);
  };

  const handleCloseShow = () => {
    setIsShowModal(false);
  };

  return (
    <div>
      <br />
      <div className="title_style">
        <h3>Danh Sách Khách Hàng Rút tiền</h3>
      </div>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id Rút Tiền</TableCell>
              <TableCell align="right">Id User</TableCell>
              <TableCell align="right">Số tiền rút</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Ngày</TableCell>
              <TableCell align="right">Thực hiện</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPriceWithDraw.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.id_user_money}</TableCell>
                <TableCell align="right">{row.id_price_withdraw}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.date_create_at}</TableCell>
                <TableCell align="right">
                  {row.status === "Loading Withdraw" ? (
                    <Button
                      variant="contained"
                      onClick={() => getPriceIdWithDraw(row)}
                    >
                      Rút tiền
                    </Button>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalConfirmPaymentGuestWithdraw
        show={isShowModal}
        handleClose={handleCloseShow}
        nameGetConfirm={dataGetEdit}
        idBankName={idBankName}
        idBank={dataGetNameBank}
        handleUpdateTable={getAPIPrice}
      />
    </div>
  );
}
