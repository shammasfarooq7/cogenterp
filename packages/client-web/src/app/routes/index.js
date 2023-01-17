import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// pages
import { Login } from "../pages/auth/login";
// other packages
import { AUTH_LINKS, ROOT_ROUTE } from "../constants";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT_ROUTE} element={<Navigate replace to={AUTH_LINKS.LOGIN_LINK} />} />
        <Route path={AUTH_LINKS.LOGIN_LINK} element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes;