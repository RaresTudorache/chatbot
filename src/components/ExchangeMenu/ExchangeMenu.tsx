import { Button, Stack, Typography } from "@mui/material";
import { StockExchange } from "../../types/types";

export type ExchangeMenuProps = {
  exchanges: StockExchange[];
  onSelectExchange: (exchangeCode: string) => void;
};

const ExchangeMenu = ({ exchanges, onSelectExchange }: ExchangeMenuProps) => {
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

export default ExchangeMenu;
