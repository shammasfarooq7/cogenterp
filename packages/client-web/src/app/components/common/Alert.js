//packages block
import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar, VariantType, WithSnackbarProps } from "notistack";

let useSnackbarRef;

export const SnackbarUtilsConfiguration = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const CloseButton = ({ id }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      color="inherit"
      size="small"
      onClick={() => closeSnackbar(id)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export const Alert = {
  success(message) {
    this.toast(message, "success");
  },
  warning(message) {
    this.toast(message, "warning");
  },
  info(message) {
    this.toast(message, "info");
  },
  error(message) {
    this.toast(message, "error");
  },
  toast(message, variant = "default") {
    useSnackbarRef.enqueueSnackbar(message, { variant });
  },
};
