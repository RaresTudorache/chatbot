import { Stack, CssBaseline, ThemeProvider, Paper } from "@mui/material";
import HomeMenu from "./components/HomeMenu/HomeMenu";
import StockDetails from "./components/StockDetails/StockDetails";
import StockMenu from "./components/StockMenu/StockMenu";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MessageBar from "./components/MessageBar/MessageBar";
import { theme } from "./theme/theme";
import { useChatStore } from "./store/useChatStore";

const App = () => {
  const {
    chatHistory,
    exchange,
    selectedStock,
    stockExchanges,
    setSelectedStock,
    handleSelectExchange,
    handleSelectStock,
    handleBackToHome,
  } = useChatStore();

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
              overflow: "auto",
            }}
          >
            <Stack
              spacing={2}
              sx={{ width: "100%", padding: "0 2rem", flex: 1 }}
            >
              {chatHistory.map((item, index) => (
                <MessageBar key={index} {...item} />
              ))}
              {!exchange && (
                <MessageBar
                  type="assistant"
                  content={
                    <HomeMenu
                      onSelectExchange={handleSelectExchange}
                      exchanges={stockExchanges}
                    />
                  }
                />
              )}
              {exchange && !selectedStock && (
                <MessageBar
                  type="assistant"
                  content={
                    <StockMenu
                      stocks={exchange.topStocks}
                      onSelectStock={handleSelectStock}
                      onBack={handleBackToHome}
                    />
                  }
                />
              )}
              {selectedStock && (
                <MessageBar
                  type="assistant"
                  content={
                    <StockDetails
                      stock={selectedStock}
                      onBack={() => setSelectedStock(null)}
                    />
                  }
                />
              )}
            </Stack>
            <Footer />
          </Paper>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
