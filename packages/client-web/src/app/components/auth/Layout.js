// packages block
import { FC } from "react";
import { Box, Typography } from "@mui/material";
// import { images } from "../../assets/images";
// component block
import { AuthLayoutBox, AuthLayoutContainer } from "../../theme/styleComponents";
// others

export const AuthLayout = ({ children, title, subTitle }) => (
  <AuthLayoutContainer>
    <Box maxWidth='543px' width='100%'>
      <Box component='img' display='block' marginX='auto'  />

      <AuthLayoutBox>
        <Box>
          <Typography variant="body1" fontSize={24}>{title}</Typography>
          <Box height={24} marginBottom='30px'>
            {subTitle && <Typography variant="subtitle1" component='p'>{subTitle}</Typography>}
          </Box>

          {children}
        </Box>
      </AuthLayoutBox>
    </Box>
  </AuthLayoutContainer>
)