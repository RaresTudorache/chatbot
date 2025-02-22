import { Button, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useHandleSend } from "../../hooks/useHandleSend";
import { useChatStore } from "../../store/useChatStore";

const Footer = () => {
  const { inputText, setInputText, handleSend } = useHandleSend();
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
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <TextField
        placeholder="Pick an option"
        variant="outlined"
        size="small"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        disabled={!inputText.trim()}
        startIcon={<SendIcon />}
      >
        Send
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleBackToHome}
        disabled={!chatHistory.length}
        startIcon={<DeleteIcon />}
      >
        Clear Chat
      </Button>
    </Stack>
  );
};

export default Footer;
