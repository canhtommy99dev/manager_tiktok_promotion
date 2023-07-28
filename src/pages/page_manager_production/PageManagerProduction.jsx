import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { ProductionTiktokPromotion } from "../../services/TransactionService";

export default function PageManagerProduction() {
  const [listPromotion, setListPromotion] = useState([]);

  const getListPromotion = async () => {
    let res = await ProductionTiktokPromotion();
    if (res && res.results) {
      setListPromotion(res.results);
    }
  };

  useEffect(() => {
    getListPromotion();
  }, []);

  return (
    <div>
      <div className="my-3 add-new">
        <span>
          <b>List User:</b>
        </span>
        <button className="btn btn-success">Add Production</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Thưởng</th>
            <th>Tổng</th>
            <th>Hình Ảnh</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listPromotion &&
            listPromotion.length > 0 &&
            listPromotion.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name_product}</td>
                  <td>{item.price}</td>
                  <td>{item.commission_discount}</td>
                  <td>{item.total_price}</td>
                  <td>
                    <img src={item.image} width="100" height="50" />
                  </td>
                  <td>
                    <Button variant="warning">Edit</Button>{" "}
                    <Button variant="danger">Delete</Button>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
