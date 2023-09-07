/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ModalAddNew from "./components/modalAddNew";
import "./components/styles.css";
import ModalEditUser from "./components/ModelEditUser";
import ModalConfirmProduction from "./components/ModelConfirm";
import ReactPaginate from "react-paginate";
import { listProductInHomePagiation } from "../../services/PromotionServiceHomePage";
///

export default function PageManagerProductionInHomePages() {
  const [listPromotion, setListPromotion] = useState([]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditProduct, setIsShowModalEditProduct] = useState(false);
  const [isShowModalDeleteId, setIsShowModalDeleteId] = useState(false);
  const [dataProductionEdit, setProductionEdit] = useState({});
  const [dataProductionDelete, setDataProductionDelete] = useState({});
  const [totalProductPage, setTotalProductPage] = useState(0);

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

  const getListPromotion = async (indexPage) => {
    let res = await listProductInHomePagiation(indexPage);
    setListPromotion(res.listPage);
    setTotalProductPage(res.totalPages);
  };

  useEffect(() => {
    getListPromotion(1);
  }, []);

  const handlePageClick = (event) => {
    getListPromotion(event.selected + 1);
  };

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
            <th>Giá trị</th>
            <th>Giảm giá</th>
            <th>Danh Mục</th>
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
                  <td>{Number(item.price).toLocaleString("en-US")} VNĐ</td>
                  <td>
                    {Number(item.commission_discount).toLocaleString("en-US")}{" "}
                    VNĐ
                  </td>
                  <td>{item.category}</td>
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
