import { create } from "zustand";
import { ChatItem, Stock, StockExchange } from "../types/types";
import { getStockData } from "../data/stockData";

interface StoreState {
  exchange: StockExchange | null;
  selectedStock: Stock | null;
  chatHistory: ChatItem[];
  stockExchanges: StockExchange[];

  setExchange: (exchange: StockExchange | null) => void;
  setSelectedStock: (stock: Stock | null) => void;
  handleSelectExchange: (exchangeCode: string) => void;
  handleSelectStock: (stock: Stock) => void;
  handleBackToHome: () => void;
  clearChat: () => void;
}

export const useChatStore = create<StoreState>((set, get) => ({
  exchange: null,
  selectedStock: null,
  chatHistory: [
    {
      type: "assistant",
      content: "Hello! Welcome to LSEG, I'm here to help you.",
    },
  ],
  stockExchanges: getStockData(),

  setExchange: (exchange) => set({ exchange }),
  setSelectedStock: (stock) => set({ selectedStock: stock }),

  handleSelectExchange: (exchangeCode) => {
    const { stockExchanges } = get();
    const foundExchange = stockExchanges.find((ex) => ex.code === exchangeCode);

    set((state) => ({
      exchange: foundExchange || null,
      selectedStock: null,
      chatHistory: [
        ...state.chatHistory,
        { type: "user", content: `I want to see stocks from ${exchangeCode}` },
        {
          type: "assistant",
          content: `Here are the top stocks from ${exchangeCode}:`,
        },
      ],
    }));
  },

  handleSelectStock: (stock) => {
    set((state) => ({
      selectedStock: stock,
      chatHistory: [
        ...state.chatHistory,
        { type: "user", content: `Show me details for ${stock.stockName}` },
        {
          type: "assistant",
          content: `Here are the details for ${stock.stockName}:`,
        },
      ],
    }));
  },

  handleBackToHome: () => {
    set((state) => ({
      exchange: null,
      selectedStock: null,
      chatHistory: [
        ...state.chatHistory,
        { type: "user", content: "Let's start over" },
        { type: "assistant", content: "What would you like to explore?" },
      ],
    }));
  },
  clearChat: () => {
    set({ chatHistory: [] });
  },
}));
