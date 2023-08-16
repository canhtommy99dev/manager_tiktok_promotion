import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getPriceListPeople } from "../../services/HistoryTransaction";

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

export default function PageManagerPrice() {
  const [listPriceTransaction, setListPriceTransaction] = useState([]);

  useEffect(() => {
    getAPIPrice();
  }, []);

  const getAPIPrice = async () => {
    let resPrice = await getPriceListPeople();
    setListPriceTransaction(resPrice.results);
  };
  return (
    <div>
      <br />
      <h3>Quản lý nạp và rút</h3>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Ngày</TableCell>
              <TableCell align="right">Tiền</TableCell>
              <TableCell align="right">Nội Dung</TableCell>
              <TableCell align="right">User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPriceTransaction.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.time_createAt_map}</TableCell>
                <TableCell align="right">{row.coin_in_payment}</TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell align="right">{row.user_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
