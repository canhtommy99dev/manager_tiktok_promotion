import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { UserServices } from "../services/UserServices";
import ReactPaginate from "react-paginate";
///
import ModalAddNew from "./modalAddNew";
import ModalEditUser from "./ModelEditUser";
import ModalConfirm from "./ModelConfirm";
import { Button } from "react-bootstrap";
import lodash from "lodash";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalUserPage, setTotalUserPage] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  const [dataUserEdit, setdataUserEdit] = useState({});
  const [dataGetEdit, setdataGetEdit] = useState({});

  const handleCloseShow = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEditUser(false);
    setIsShowModalDeleteUser(false);
  };

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUser = lodash.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
    //   console.log(listUser, cloneListUser);
    //   console.log(">>>index", index);
  };

  const getUser = async (page) => {
    let res = await UserServices(page);
    if (res && res.data) {
      setTotalUser(res.total);
      setTotalUserPage(res.total_pages);
      setListUser(res.data);
    }
  };

  useEffect(() => {
    getUser(1);
  }, []);

  const handlePageClick = (event) => {
    // console.log("event result", event);
    getUser(event.selected + 1);
  };
  const handleClickEdit = (user) => {
    setdataUserEdit(user);
    setIsShowModalEditUser(true);
  };

  const handleClickDelete = (user) => {
    setIsShowModalDeleteUser(true);
    setdataGetEdit(user);
  };

  // const handleClickDeleteFrom = (user) => {
  //   let cloneListUser = lodash.cloneDeep(listUser);
  //   let index = listUser.findIndex((item) => item.id === user.id);
  //   cloneListUser[index].first_name = user.first_name;
  //   setListUser(cloneListUser);
  // };

  return (
    <div>
      <div className="my-3 add-new">
        <span>
          <b>List User: {totalUser}</b>
        </span>{" "}
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add USER
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
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
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalUserPage}
        previousLabel="< previous"
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
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEditUser}
        handleClose={handleCloseShow}
        dataUserEdit={dataUserEdit}
        handleUpdateTable={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDeleteUser}
        handleClose={handleCloseShow}
        nameGetDelete={dataGetEdit}
      />
    </div>
  );
};
export default TableUser;
