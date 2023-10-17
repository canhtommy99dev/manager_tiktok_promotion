import React from "react";
import "../../App.scss";
import { loginApp } from "../../services/UserServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/useContext";

function LoginApp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassWord, setShowPassWord] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);

  const { loginContext } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    //
    const tokenAdmin = "363663366";
    if (!email || !password) {
      toast.error("Email/Password phải nhập đầy đủ");
      return;
    } else if (email === "Admin" && password === "Tiktokshop368") {
      toast.success("Bạn đã đăng nhập quản trị");
      loginContext("root", tokenAdmin);
      navigate("/");
    }
    // setLoadingAPI(true);
    // let res = await loginApp(email, password);
    // if (res && res.token) {
    //   loginContext(email, res.token);
    //   navigate("/");
    //   toast.success(res.data);
    // } else {
    //   if (res && res.status === 400) {
    //     toast.error(res.data.error);
    //   }
    // }
    // setLoadingAPI(false);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Login</div>
      <div className="title">User Access</div>
      <input
        type="text"
        placeholder="User"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="input-2">
        <input
          type={showPassWord === true ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <i
          class={
            showPassWord === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
          }
          onClick={() => setShowPassWord(!showPassWord)}
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password && !loadingAPI ? false : true}
        onClick={() => handleLogin()}
      >
        {loadingAPI && <i class="fas fa-spinner fa-spin"></i>}&nbsp; Login
      </button>
      <div className="back">
        <i class="fa-solid fa-angles-left"></i>
        &nbsp;
        <span onClick={() => handleGoBack()}>Go Back</span>
      </div>
    </div>
  );
}

export default LoginApp;
