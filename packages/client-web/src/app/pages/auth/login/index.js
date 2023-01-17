// component import
import React from "react";
// import { AuthLayout } from "../../../components/auth/Layout";
import { LoginForm } from "../../../components/auth/LoginForm";
// other imports
import { GET_STARTED, LOG_IN } from "../../../constants";

export const Login = () => (
  // <AuthLayout title={LOG_IN} subTitle={GET_STARTED}>
    <LoginForm />
  // </AuthLayout>
)