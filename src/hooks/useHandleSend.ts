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

  // State to manage the input text in the chat
  const [inputText, setInputText] = useState("");

  /**
   * Handles the sending of messages and processes different types of user inputs:
   * 1. Exchange selection
   * 2. Stock selection (based on chat history)
   * 3. Restart command
   * 4. Regular text messages
   */
  const handleSend = () => {
    if (!inputText.trim()) return;

    addToChatHistory({
      type: UserType.USER,
      contentType: ContentType.TEXT,
      textContent: inputText,
    });

    // Check for exchange names in the input
    // Supports major exchanges: NYSE, NASDAQ, LSE, TSE
    const exchanges = ["NYSE", "NASDAQ", "LSE", "TSE"];
    const exchangeFound = exchanges.find((exchange) =>
      inputText.toLowerCase().includes(exchange.toLowerCase())
    );
    if (exchangeFound) {
      handleSelectExchange(exchangeFound);
      setInputText("");
      return;
    }

    // Search for stock names mentioned in previous conversations
    // This allows users to reference stocks they've already discussed
    const stocksInHistory = chatHistory
      .filter((item) => item.contentType === ContentType.STOCK_DETAILS)
      .map((item) => item.stockData?.stockName)
      .filter(Boolean);

    // Matches partial words in both directions for better user experience
    const stockFound = stocksInHistory.find((stockName) => {
      if (!stockName) return false;
      const stockWords = stockName.toLowerCase().split(" ");
      const inputWords = inputText.toLowerCase().split(" ");
      return stockWords.some((word) =>
        inputWords.some(
          (inputWord) => inputWord.includes(word) || word.includes(inputWord)
        )
      );
    });

    // If a stock is found, retrieve its full details and handle the selection
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

    // Handle the restart command to reset the chat
    if (inputText === "restart") {
      handleBackToHome();
      setInputText("");
      return;
    }

    // If none of the above conditions are met,
    // the message has already been added to chat history
    setInputText("");
  };

  return {
    inputText,
    setInputText,
    handleSend,
  };
};
