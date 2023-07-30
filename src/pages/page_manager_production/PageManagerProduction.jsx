/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { ProductionTiktokPromotion } from "../../services/TransactionService";
import ModalAddNew from "./components/modalAddNew";
import "./components/styles.css";
import ModalEditUser from "./components/ModelEditUser";
import ModalConfirmProduction from "./components/ModelConfirm";

export default function PageManagerProduction() {
  const [listPromotion, setListPromotion] = useState([]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditProduct, setIsShowModalEditProduct] = useState(false);
  const [isShowModalDeleteId, setIsShowModalDeleteId] = useState(false);
  const [dataProductionEdit, setProductionEdit] = useState({});
  const [dataProductionDelete, setDataProductionDelete] = useState({});

  const handleCloseShow = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEditProduct(false);
    setIsShowModalDeleteId(false);
  };

  const handleClickEdit = (product) => {
    setProductionEdit(product);
    setIsShowModalEditProduct(true);
  };

  const handleClickDelete = (product) => {
    setDataProductionDelete(product);
    setIsShowModalDeleteId(true);
  };

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
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add Production
        </button>
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
                    <img
                      src={item.image}
                      width="100"
                      height="50"
                      object-fit="cover"
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleClickEdit(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleClickDelete(item)}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleCloseShow}
        handleUpdateTable={getListPromotion}
      />
      <ModalEditUser
        show={isShowModalEditProduct}
        handleClose={handleCloseShow}
        handleUpdateTable={getListPromotion}
        dataProductEdit={dataProductionEdit}
      />
      <ModalConfirmProduction
        show={isShowModalDeleteId}
        handleClose={handleCloseShow}
        nameGetDelete={dataProductionDelete}
        handleUpdateTable={getListPromotion}
      />
    </div>
  );
}
