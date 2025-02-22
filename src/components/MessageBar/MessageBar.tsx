import { Button, Stack, Typography } from "@mui/material";
import { StockExchange } from "types/stocks";

type MessageBarProps = {
  message: string;
  options?: StockExchange[];
};

const MessageBar = ({ message, options }: MessageBarProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body1">{message}</Typography>
      {options && (
        <Stack direction="row" spacing={2}>
          {options?.map((option) => (
            <Button key={option.code} variant="contained">
              {option.name}
            </Button>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default MessageBar;
