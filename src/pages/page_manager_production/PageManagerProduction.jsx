/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { getFindProduction } from "../../services/PromotionServices";
import "./components/styles.css";
import ModalConfirmProduction from "./components/ModelConfirm";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

export default function PageManagerProduction() {
  const navigate = useNavigate();
  const [listPromotion, setListPromotion] = useState([]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditProduct, setIsShowModalEditProduct] = useState(false);
  const [isShowModalDeleteId, setIsShowModalDeleteId] = useState(false);
  const [dataProductionEdit, setProductionEdit] = useState({});
  const [dataProductionDelete, setDataProductionDelete] = useState({});
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalProductPage, setTotalProductPage] = useState(0);
  ///
  const [textKeyFind, setTextKeyFind] = useState("");
  const [categoryFind, setTextCategoryFind] = useState("");

  const handleCloseShow = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEditProduct(false);
    setIsShowModalDeleteId(false);
  };

  const handleClickEdit = (product) => {
    navigate(`/edit_production_shop/${product.id}`);
  };

  const handleClickDelete = (product) => {
    setDataProductionDelete(product);
    setIsShowModalDeleteId(true);
  };

  const getListPromotion = async (keysearch, category, page) => {
    let res = await getFindProduction(keysearch, category, page);
    if (res && res.listPage) {
      setListPromotion(res.listPage);
      setTotalProductPage(res.totalPages);
      setTotalProduct(res.total);
    }
  };

  const handleChange = (e) => {
    setTextCategoryFind(e.target.value);
    getListPromotion(textKeyFind, e.target.value, 1);
  };

  const handlePageClick = (event) => {
    getListPromotion(textKeyFind, categoryFind, event.selected + 1);
  };

  const appEventSearch = () => {
    getListPromotion(textKeyFind, categoryFind, 1);
  };

  useEffect(() => {
    getListPromotion(textKeyFind, categoryFind, 1);
  }, []);

  const addProductApp = () => {
    navigate(`/create_production_shop`);
  };

  return (
    <div>
      <div className="my-3 add-new">
        <span>
          <b>Tổng sản phẩm: {totalProduct}</b>
        </span>
        <button className="btn btn-success" onClick={() => addProductApp()}>
          Add Production
        </button>
      </div>
      <div className="my-3 ">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => {
            setTextKeyFind(e.target.value);
          }}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              appEventSearch();
              ev.preventDefault();
            }
          }}
        />
        <Form.Group controlId="formBasicSelect">
          <Form.Label>Danh Mục</Form.Label>
          <Form.Control
            as="select"
            value={categoryFind}
            onChange={handleChange}
          >
            <option value="">Tất cả</option>
            <option value="Phổ thông">Phổ thông</option>
            <option value="Tiểu thương">Tiểu thương</option>
            <option value="Thương Gia">Thương Gia</option>
            <option value="Đại lý tiktok">Đại lý tiktok</option>
            <option value="Doanh nghiệp">Doanh nghiệp</option>
            <option value="VIP">VIP</option>
          </Form.Control>
        </Form.Group>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Thưởng</th>
            <th>Cấp Bậc</th>
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
                  <td className="d-inline-flex p-2 bd-highlight">
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleClickEdit(item)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleClickDelete(item)}
                    >
                      Delete
                    </button>{" "}
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
      <ModalConfirmProduction
        show={isShowModalDeleteId}
        handleClose={handleCloseShow}
        nameGetDelete={dataProductionDelete}
        handleUpdateTable={getListPromotion}
      />
    </div>
  );
}
