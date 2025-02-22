import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { UserType, ContentType } from "../types/types";

export const useHandleSend = () => {
  const {
    chatHistory,
    handleBackToHome,
    handleSelectExchange,
    handleSelectStock,
    addToChatHistory,
  } = useChatStore();
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message to chat
    addToChatHistory({
      type: UserType.USER,
      contentType: ContentType.TEXT,
      textContent: inputText,
    });

    // Check if input contains any exchange name or abbreviation
    const exchanges = ["NYSE", "NASDAQ", "LSE", "TSE"];
    const exchangeFound = exchanges.find((exchange) =>
      inputText.toLowerCase().includes(exchange.toLowerCase())
    );
    if (exchangeFound) {
      handleSelectExchange(exchangeFound);
      setInputText("");
      return;
    }

    // Check if input contains any stock name from chat history
    const stocksInHistory = chatHistory
      .filter((item) => item.contentType === ContentType.STOCK_DETAILS)
      .map((item) => item.stockData?.stockName)
      .filter(Boolean);

    const stockFound = stocksInHistory.find(
      (stockName) =>
        stockName && inputText.toLowerCase().includes(stockName.toLowerCase())
    );

    if (stockFound) {
      const stock = chatHistory.find(
        (item) =>
          item.contentType === ContentType.STOCK_DETAILS &&
          item.stockData?.stockName === stockFound
      )?.stockData;

      if (stock) {
        handleSelectStock(stock);
        setInputText("");
        return;
      }
    }

    // Check if input is "restart"
    if (inputText === "restart") {
      handleBackToHome();
      setInputText("");
      return;
    }

    // If no matches, just add the message
    setInputText("");
  };

  return {
    inputText,
    setInputText,
    handleSend,
  };
};
