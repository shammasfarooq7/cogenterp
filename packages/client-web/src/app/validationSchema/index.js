import * as yup from "yup";
import { INVALID_EMAIL } from "../constants";
import {requiredMessage } from "../utils";

const passwordValidationSchema = { password: yup.string().required(requiredMessage("Password")), }

const emailValidationSchema = {
  email: yup.string().email(INVALID_EMAIL).required(requiredMessage("Email")),
}

const emailNotRequiredValidationSchema = {
  email: yup.string().email(INVALID_EMAIL)
}

export const loginValidationSchema = yup.object({
  ...emailValidationSchema,
  ...passwordValidationSchema
});
