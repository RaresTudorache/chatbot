import { Button, Stack, Typography } from "@mui/material";
import { StockExchange } from "../../types/types";

export type HomeMenuProps = {
  onSelectExchange: (exchangeCode: string) => void;
  exchanges: StockExchange[];
};

const HomeMenu = ({ onSelectExchange, exchanges }: HomeMenuProps) => {
  return (
    <Stack spacing={2}>
      <Typography variant="body1" gutterBottom>
        Please select a stock exchange:
      </Typography>
      {exchanges.map((exchange) => (
        <Button
          key={exchange.code}
          variant="contained"
          onClick={() => onSelectExchange(exchange.code)}
        >
          {exchange.stockExchange} ({exchange.code})
        </Button>
      ))}
    </Stack>
  );
};

export default HomeMenu;
