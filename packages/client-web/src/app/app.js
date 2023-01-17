// packages block
import React from 'react';
import MainRoutes from "./routes";


export function App() {
  return (
    // <SnackbarProvider
    //   maxSnack={5} autoHideDuration={5000} action={key => <CloseButton id={key} />}
    //   preventDuplicate={true} anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //   classes={{ containerRoot: 'snackbarProvider' }}
    // >
        <>
      {/* <SnackbarUtilsConfiguration /> */}

      {/* <ApolloProvider client={client}> */}
        {/* <AuthContextProvider> */}
          {/* <ThemeProvider theme={customTheme}>
            <CssBaseline /> */}
            {/* <AppContextProvider> */}
              <MainRoutes />
            {/* </AppContextProvider> */}
          {/* </ThemeProvider> */}
        {/* </AuthContextProvider> */}
      {/* </ApolloProvider> */}
      </>
    // </SnackbarProvider>
  );
}

export default App;
