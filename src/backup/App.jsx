import { Container } from "react-bootstrap";
import "./App.scss";
import Headers from "./components/header";
import React from "react";
import RoutesLinkApi from "./routes/routes_link";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
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
