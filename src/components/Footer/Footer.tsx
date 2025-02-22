import { Button, Stack, Typography } from "@mui/material";
import { useChatStore } from "../../store/useChatStore";

const Footer = () => {
  const { chatHistory, handleBackToHome } = useChatStore();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      padding={2}
      spacing={2}
      borderRadius="0 0 16px 16px"
      position="sticky"
      bottom={0}
      sx={{ backgroundColor: "primary.main" }}
    >
      <Typography variant="body1" color="white">
        Pick an option
      </Typography>
      <Button
        variant="contained"
        color="warning"
        onClick={handleBackToHome}
        disabled={!chatHistory.length}
      >
        Clear Chat
      </Button>
    </Stack>
  );
};

export default Footer;
