import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { postUserRegister } from "../../../services/ProfileServices";
import { toast } from "react-toastify";
import "../../../App.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ModalAddUser = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [showPassWord, setShowPassWord] = useState(false);
  ////textEdit
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  ////
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mendatory")
      .min(3, "Password must be at 3 char long"),
    confirmPwd: Yup.string()
      .required("Password is mendatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data) {
    postUserNew();
    return false;
  }

  const setClose = () => {
    handleClose();
    setUserName("");
    setPhoneNumber("");
    setPassword("");
  };

  const postUserNew = async () => {
    let res = await postUserRegister(
      userName,
      passWord,
      phoneNumber,
      "null",
      "null"
    );
    if (res.status === "email-did-have-account") {
      toast.error("Add new user not found");
    } else {
      toast.success("Add new success");
      setClose();
      handleUpdateTable();
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={() => setClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng Ký Người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">

            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                // onChange={(event) => setCommissionDiscount(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Xác Nhận Mật Khẩu</label>
              <input
                type="password"
                {...register("confirmPwd")}
                className={`form-control ${
                  errors.confirmPwd ? "is-invalid" : ""
                }`}
                // onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="invalid-feedback">{errors.confirmPwd?.message}</div>

            <Button
              variant="primary"
            >
              Thêm Sản Phẩm
            </Button>
          </form> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Tên Người dùng</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setUserName(event.target.value)}
              />
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="number"
                  maxLength="10"
                  size="10"
                  className="form-control"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
              <div className="input-2">
                <label>Mật khẩu</label>
                <input
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassWord === true ? "text" : "password"}
                  {...register("password")}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />{" "}
                <i
                  class={
                    showPassWord === true
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash"
                  }
                  onClick={() => setShowPassWord(!showPassWord)}
                ></i>
              </div>
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="mb-3">
              <label>Xác Nhận Mật Khẩu</label>
              <input
                name="confirmPwd"
                type={showPassWord === true ? "text" : "password"}
                {...register("confirmPwd")}
                className={`form-control ${
                  errors.confirmPwd ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.confirmPwd?.message}
              </div>
            </div>
            <div className="mt-3">
              <Button variant="secondary" onClick={() => setClose()}>
                Đóng
              </Button>
              {"    "}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddUser;
