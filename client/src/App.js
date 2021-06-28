import Home from "./pages/Home";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}
