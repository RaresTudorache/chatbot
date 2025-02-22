import { getStockData } from "./data/stockData";
import {
  Stack,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
import { Stock, StockExchange } from "./types/stocks";
import { useState } from "react";
import HomeMenu from "./components/HomeMenu/HomeMenu";
import StockDetails from "./components/StockDetails/StockDetails";
import StockMenu from "./components/StockMenu/StockMenu";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MessageBar from "./components/MessageBar/MessageBar";

const PRIMARY_COLOR = "#011EFF";
const SECONDARY_COLOR = "#8028FE";

const theme = createTheme({
  palette: {
    primary: { main: PRIMARY_COLOR },
    secondary: { main: SECONDARY_COLOR },
  },
});

const App = () => {
  const [exchange, setExchange] = useState<StockExchange | null>(null);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const stockExchanges = getStockData();

  const handleSelectExchange = (exchangeCode: string) => {
    const foundExchange = stockExchanges.find((ex) => ex.code === exchangeCode);
    setExchange(foundExchange || null);
    setSelectedStock(null);
  };

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const handleBackToHome = () => {
    setExchange(null);
    setSelectedStock(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #f3f4f6, #e0e0e0)",
          overflow: "hidden",
        }}
      >
        <Stack
          spacing={0}
          sx={{
            width: "75%",
            height: "90%",
            margin: "0 auto",
          }}
        >
          <Header />

          <Paper
            elevation={6}
            sx={{
              flex: 1,
              paddingTop: "2rem",
              paddingBottom: "0",
              borderRadius: "0 0 16px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <MessageBar message="Hello, how can I help you today?" />
            {!exchange && <HomeMenu onSelectExchange={handleSelectExchange} />}
            {exchange && !selectedStock && (
              <StockMenu
                stocks={exchange.topStocks}
                onSelectStock={handleSelectStock}
                onBack={handleBackToHome}
              />
            )}
            {selectedStock && (
              <StockDetails
                stock={selectedStock}
                onBack={() => setSelectedStock(null)}
              />
            )}
            <Footer />
          </Paper>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
