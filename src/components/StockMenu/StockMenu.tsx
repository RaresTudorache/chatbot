
import { Button, Container, Typography, Stack } from "@mui/material";
import { Stock } from "../../types/stocks";


type StockMenuProps = {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  onBack: () => void;
}

const StockMenu = ({ stocks, onSelectStock, onBack }: StockMenuProps) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Select a Stock
      </Typography>
      <Stack spacing={2}>
        {stocks.map((stock) => (
          <Button key={stock.code} variant="outlined" onClick={() => onSelectStock(stock)}>
            {stock.stockName}
          </Button>
        ))}
        <Button variant="contained" color="secondary" onClick={onBack}>
          Back to Home
        </Button>
      </Stack>
    </Container>
  );
};

export default StockMenu;
