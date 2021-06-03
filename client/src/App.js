import Home from "./pages/Home";
// import axios from "axios";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  // useEffect(() => {
  //   axios.post("/test", { test: "test" }).then(res => {
  //     console.log(res.data)
  //   });
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}
