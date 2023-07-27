import { Container } from "react-bootstrap";
import "./App.scss";
import Headers from "./components/header";
import React from "react";
import RoutesLinkApi from "./routes/routes_link";

import { UserContext } from "./context/useContext";
import { ToastContainer } from "react-toastify";
import { useEffect, useContext } from "react";

function App() {
  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      loginContext(email, token);
    }
  });

  return (
    <div className="app-container">
      <Headers />

      <Container>
        <RoutesLinkApi />
      </Container>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
