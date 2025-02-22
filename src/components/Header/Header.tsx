import { Stack, Typography, Paper } from "@mui/material";
import { SmartToy } from "@mui/icons-material";

const Header = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: "primary.main",
        borderRadius: "16px 16px 0 0",
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        padding={2}
        spacing={2}
      >
        <SmartToy sx={{ color: "white" }} />
        <Typography variant="body1" color="white">
          LSEG Chatbot
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Header;
