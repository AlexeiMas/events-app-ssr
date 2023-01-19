import {Footer, Header} from "../components";
import React from "react";
import {Container, createTheme, CssBaseline, Stack, ThemeProvider} from "@mui/material";
import BackdropLoader from "../components/BackdropLoader";

export const ColorModeContext = React.createContext<() => void>(() => void 0)

export const MainLayout = ({children}: React.PropsWithChildren) => {
  const [mode, setMode] = React.useState<"light" | "dark" | undefined>(undefined)
  const colorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0);
    (localStorage.getItem('themeApp') === "dark") ? setMode("dark") : setMode("light")
  }, [])

  React.useEffect(() => {
    if (mode) {
      return localStorage.setItem('themeApp', mode)
    }
  }, [mode])

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode
      },
    }), [mode]);

  if (!mode) {
    return (
      <BackdropLoader/>
    )
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <Stack justifyContent={"space-between"} minHeight={"100vh"}>
          <Container sx={{mt: "100px"}} component={"main"}>
            {children}
          </Container>
          <Footer/>
        </Stack>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}