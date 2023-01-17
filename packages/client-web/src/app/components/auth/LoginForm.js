//packages block
import React from "react";
import { useContext, useEffect } from "react";
import { Button, CircularProgress, Box } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
// component block
import { CustomController } from "../common/CustomController"
import { Alert } from "../common/Alert";
// others
import { AUTH_TOKEN, DASHBOARD_ROUTE, EMAIL_CHANGED_OR_NOT_VERIFIED_MESSAGE, FORBIDDEN_EXCEPTION, LOGIN, LOGIN_FIELDS, WRONG_EMAIL_OR_PASSWORD } from "../../constants";
// import { AuthContext } from "../../context/AuthContext";
// import { LoginUserInput, useLoginMutation } from "../../../generated";
import { loginValidationSchema } from "../../validationSchema";

export const LoginForm = () => {
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    // await login({
    //   variables: {
    //     loginUserInput: data,
    //   }
    // })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {LOGIN_FIELDS.map((field, index) => {
          const { fieldType, name, title } = field

          return (
            <CustomController
              key={index}
              controllerName={name}
              controllerLabel={title}
              fieldType={fieldType}
            />
          )
        })}

        <Box marginTop={3}>
          <Button variant="contained" type="submit" fullWidth color="primary"
            // endIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
            {LOGIN}
          </Button>
        </Box>
      </form>
    </FormProvider >
  )
}