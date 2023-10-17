import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Form } from "react-bootstrap";
import "./components/styles.css";
import ReactPaginate from "react-paginate";

import {
  getListMoneyWithDraw,
  getListPageWithdrawMoney,
} from "../../services/HistoryTransaction";
import ModalConfirmPaymentGuestWithdraw from "./components/ModelConfirmPaymentGuestWithdraw";

export default function PageWithDrawMoney() {
  const [listPriceWithDraw, setListPriceWithDraw] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataGetEdit, setdataGetEdit] = useState({});
  const [dataGetNameBank, setDataGetNameBank] = useState("");
  const [idBankName, setBankName] = useState("");
  const [textKeyFind, setTextKeyFind] = useState("");
  const [totalProductPage, setTotalProductPage] = useState(0);

  useEffect(() => {
    getAPIPrice(1, textKeyFind);
  }, []);

  const getAPIPrice = async (page, keySearch) => {
    let resPrice = await getListPageWithdrawMoney(page, keySearch);
    setListPriceWithDraw(resPrice.listPage);
    setTotalProductPage(resPrice.totalPages);
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

  const appEventSearch = () => {
    getAPIPrice(1, textKeyFind);
  };

  const handlePageClick = (event) => {
    getAPIPrice(event.selected + 1, textKeyFind);
  };

  return (
    <div>
      <br />
      <div className="title_style">
        <h3>Danh Sách Khách Hàng Rút tiền</h3>
      </div>
      <Form.Control
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        aria-describedby="passwordHelpBlock"
        onChange={(e) => {
          setTextKeyFind(e.target.value);
        }}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            appEventSearch();
          }
        }}
      />
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id Rút Tiền</TableCell>
              <TableCell align="right">Id User</TableCell>
              <TableCell align="right">Số điện thoại</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Ngày</TableCell>
              <TableCell align="right">Người dùng</TableCell>
              <TableCell align="right">Số tiền rút</TableCell>
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
                <TableCell align="right">{row.phone_number}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.date_create_at}</TableCell>
                <TableCell align="right">{row.user_guest}</TableCell>
                <TableCell align="right">
                  {Number(row.id_price_withdraw).toLocaleString("en-US")} VNĐ
                </TableCell>
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
