import { Stack, CssBaseline, ThemeProvider, Paper } from "@mui/material";
import ExchangeMenu from "./components/ExchangeMenu/ExchangeMenu";
import StockDetails from "./components/StockDetails/StockDetails";
import StockMenu from "./components/StockMenu/StockMenu";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MessageBar from "./components/MessageBar/MessageBar";
import { BLACK, LIGHT_GREY, theme } from "./theme/theme";
import { useChatStore } from "./store/useChatStore";
import { ContentType } from "./types/types";
import { useRef, useEffect } from "react";

/**
 * Main App component that orchestrates the chat interface for stock trading.
 * Manages the layout, chat history rendering, and automatic scrolling of messages.
 * Uses Material-UI components for consistent styling and responsiveness.
 */
const App = () => {
  const {
    chatHistory,
    stockExchanges,
    handleSelectExchange,
    handleSelectStock,
    handleBackToHome,
  } = useChatStore();

  // Ref for auto-scrolling the chat container to the latest message
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever chat history updates
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          background: LIGHT_GREY,
          overflow: "hidden",
        }}
      >
        <Stack
          spacing={0}
          sx={{
            width: {
              xs: "95%",
              sm: "90%",
              md: "80%",
              lg: "75%",
            },
            height: "90%",
            margin: "0 auto",
          }}
        >
          <Header />

          <Paper
            elevation={6}
            ref={scrollContainerRef}
            sx={{
              flex: 1,
              paddingTop: "2rem",
              paddingBottom: "0",
              borderRadius: { xs: "0 0 8px 8px", sm: "0 0 16px 16px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: BLACK,
              overflow: "auto",
            }}
          >
            <Stack
              spacing={2}
              sx={{
                width: "100%",
                padding: {
                  xs: "0 1rem",
                  sm: "0 1.5rem",
                  md: "0 2rem",
                },
                flex: 1,
                marginBottom: "2rem",
              }}
            >
              {chatHistory.map((item, index) => {
                switch (item.contentType) {
                  case ContentType.TEXT:
                    return (
                      <MessageBar
                        key={index}
                        type={item.type}
                        content={item.textContent}
                      />
                    );
                  case ContentType.EXCHANGE_LIST:
                    return (
                      <MessageBar
                        key={index}
                        type={item.type}
                        content={
                          <ExchangeMenu
                            exchanges={stockExchanges}
                            onSelectExchange={handleSelectExchange}
                          />
                        }
                      />
                    );
                  case ContentType.STOCK_MENU:
                    return (
                      <MessageBar
                        key={index}
                        type={item.type}
                        content={
                          <StockMenu
                            stocks={item.exchangeData?.topStocks ?? []}
                            onSelectStock={handleSelectStock}
                            onBack={handleBackToHome}
                          />
                        }
                      />
                    );
                  case ContentType.STOCK_DETAILS:
                    return (
                      <MessageBar
                        key={index}
                        type={item.type}
                        content={
                          <StockDetails
                            stock={item.stockData!}
                            onBack={handleBackToHome}
                          />
                        }
                      />
                    );
                  default:
                    return null;
                }
              })}
            </Stack>
            <Footer />
          </Paper>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
