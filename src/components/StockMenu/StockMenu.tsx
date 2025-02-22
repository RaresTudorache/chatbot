import { Button, Typography, Stack } from "@mui/material";
import { Stock } from "../../types/types";

type StockMenuProps = {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  onBack: () => void;
};

const StockMenu = ({ stocks, onSelectStock, onBack }: StockMenuProps) => {
  return (
    <Stack spacing={2}>
      <Typography variant="body1" gutterBottom>
        Please select a stock:
      </Typography>
      {stocks.map((stock) => (
        <Button
          key={stock.code}
          variant="outlined"
          onClick={() => onSelectStock(stock)}
        >
          {stock.stockName}
        </Button>
      ))}
      <Button
        variant="contained"
        color="secondary"
        onClick={onBack}
        sx={{
          textTransform: "none",
          fontSize: "1.1rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        Back
      </Button>
    </Stack>
  );
};

export default StockMenu;
