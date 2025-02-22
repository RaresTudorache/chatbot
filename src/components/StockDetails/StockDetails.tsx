import { Button, Container, Typography, Stack } from "@mui/material";
import { Stock } from "../../types/types";

type StockDetailsProps = {
  stock: Stock;
  onBack: () => void;
};

const StockDetails = ({ stock, onBack }: StockDetailsProps) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        {stock.stockName}
      </Typography>
      <Typography variant="h6" color="primary">
        Current Price: ${stock.price.toFixed(2)}
      </Typography>
      <Stack spacing={2} mt={3}>
        <Button variant="contained" onClick={onBack}>
          Back to Stock Menu
        </Button>
      </Stack>
    </Container>
  );
};

export default StockDetails;
