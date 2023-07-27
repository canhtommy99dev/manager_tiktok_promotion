import React from "react";
import { Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound";
import LoginApp from "../pages/login_app/login_app";
import WelcomeShow from "../pages/welcome_show/WelcomeShow";
import PrivateRouter from "./PrivateRouter";
import AboutPage from "../pages/about_page/aboutPage";
import HomePage from "../pages/home_page/home_page";

import AboutInCode from "../pages/about_in_code/about_in_code";
import ManagerTransaction from "../pages/manager_in_transaction/manager_in_transaction";

export default function RoutesLinkApi() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomeShow />} />
        <Route path="/login" element={<LoginApp />} />
        <Route
          path="/table"
          element={
            <PrivateRouter>
              <HomePage />
            </PrivateRouter>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRouter>
              <AboutPage />
            </PrivateRouter>
          }
        />
        <Route
          path="/about_in_params/:id"
          element={
            <PrivateRouter>
              <AboutInCode />
            </PrivateRouter>
          }
        />
        <Route
          path="/manager_transaction"
          element={
            <PrivateRouter>
              <ManagerTransaction />
            </PrivateRouter>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
