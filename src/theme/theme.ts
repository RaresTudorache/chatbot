import { createTheme } from "@mui/material";

export const PRIMARY_COLOR = "#011EFF";
export const SECONDARY_COLOR = "#8028FE";

export const theme = createTheme({
  palette: {
    primary: { main: PRIMARY_COLOR },
    secondary: { main: SECONDARY_COLOR },
  },
});
