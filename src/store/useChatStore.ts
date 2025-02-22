/**

 * This store manages the state and interactions for a chat-based interface
 * that helps users explore stock exchanges and their listed stocks.
 *
 * Key responsibilities:
 * - Maintains the current selected exchange and stock
 * - Manages chat history between user and assistant
 * - Handles navigation between exchanges and stocks
 * - Persists chat state across sessions
 *
 * The chat flow typically follows this pattern:
 * 1. Shows welcome message and list of exchanges
 * 2. User selects an exchange -> Shows stocks in that exchange
 * 3. User selects a stock -> Shows detailed stock information
 *
 * The store uses Zustand for state management and includes persistence
 * to maintain the chat state across page reloads.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ChatItem,
  ContentType,
  Stock,
  StockExchange,
  UserType,
} from "../types/types";
import { getStockData } from "../data/stockData";

type StoreState = {
  exchange: StockExchange | null;
  selectedStock: Stock | null;
  chatHistory: ChatItem[];
  stockExchanges: StockExchange[];

  setExchange: (exchange: StockExchange | null) => void;
  setSelectedStock: (stock: Stock | null) => void;
  handleSelectExchange: (exchangeCode: string) => void;
  handleSelectStock: (stock: Stock) => void;
  handleBackToHome: () => void;
  addToChatHistory: (chatItem: ChatItem) => void;
};

export const useChatStore = create<StoreState>()(
  persist(
    (set, get) => ({
      exchange: null,
      selectedStock: null,
      chatHistory: [
        {
          type: UserType.ASSISTANT,
          contentType: ContentType.TEXT,
          textContent: "Hello! Welcome to LSEG, I'm here to help you!",
        },
        {
          type: UserType.ASSISTANT,
          contentType: ContentType.EXCHANGE_LIST,
        },
      ],
      stockExchanges: getStockData(),

      setExchange: (exchange) => set({ exchange }),
      setSelectedStock: (stock) => set({ selectedStock: stock }),

      addToChatHistory: (chatItem: ChatItem) => {
        set((state) => ({
          chatHistory: [...state.chatHistory, chatItem],
        }));
      },

      handleSelectExchange: (exchangeCode) => {
        const { stockExchanges, addToChatHistory } = get();
        const foundExchange = stockExchanges.find(
          (ex) => ex.code === exchangeCode
        );

        if (foundExchange) {
          set({ exchange: foundExchange, selectedStock: null });

          addToChatHistory({
            type: UserType.USER,
            contentType: ContentType.TEXT,
            textContent: `I want to see stocks from ${exchangeCode}`,
          });

          addToChatHistory({
            type: UserType.ASSISTANT,
            contentType: ContentType.STOCK_MENU,
            exchangeData: foundExchange,
          });
        }
      },

      handleSelectStock: (stock) => {
        const { addToChatHistory } = get();

        set({ selectedStock: stock });

        addToChatHistory({
          type: UserType.USER,
          contentType: ContentType.TEXT,
          textContent: `Show me details for ${stock.stockName}`,
        });

        addToChatHistory({
          type: UserType.ASSISTANT,
          contentType: ContentType.STOCK_DETAILS,
          stockData: stock,
        });
      },

      handleBackToHome: () => {
        set({ exchange: null, selectedStock: null, chatHistory: [] });

        const { addToChatHistory } = get();

        addToChatHistory({
          type: UserType.USER,
          contentType: ContentType.TEXT,
          textContent: "Let's start over",
        });

        addToChatHistory({
          type: UserType.ASSISTANT,
          contentType: ContentType.TEXT,
          textContent: "What would you like to explore?",
        });

        addToChatHistory({
          type: UserType.ASSISTANT,
          contentType: ContentType.EXCHANGE_LIST,
        });
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        exchange: state.exchange,
        selectedStock: state.selectedStock,
        chatHistory: state.chatHistory,
      }),
    }
  )
);
