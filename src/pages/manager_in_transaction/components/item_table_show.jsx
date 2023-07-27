import React from "react";
import Table from "react-bootstrap/Table";

import { Button } from "react-bootstrap";

export default function ItemTableShow(props) {
  const { listItem } = props;
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Id User</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Date Create</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listItem &&
            listItem.length > 0 &&
            listItem.map((item, index) => {
              return (
                <tr key={`id-${index}`}>
                  <td>{item.id_generation}</td>
                  <td>{item.status}</td>
                  <td>{item.id_user}</td>
                  <td>{item.price_transaction}</td>
                  <td>{item.discount}</td>
                  <td>{item.date_create}</td>
                  <td>
                    <Button
                      variant="warning"
                      //   onClick={() => handleClickEdit(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      //   onClick={() => handleClickDelete(item)}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
