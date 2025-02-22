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

//this could be futher improved by using a reducer to handle the chat history
// and also by creating scenarios
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

        // Add loading state
        set((state) => ({
          chatHistory: [
            ...state.chatHistory,
            {
              type: UserType.ASSISTANT,
              contentType: ContentType.LOADING,
            },
          ],
        }));

        // Remove loading state after 2 seconds
        setTimeout(() => {
          set((state) => ({
            chatHistory: state.chatHistory.slice(0, -1),
          }));
        }, 2000);
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

        addToChatHistory({
          type: UserType.ASSISTANT,
          contentType: ContentType.LOADING,
        });
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
