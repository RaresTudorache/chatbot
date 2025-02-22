import { ReactNode } from "react";

export type Stock = {
  code: string;
  stockName: string;
  price: number;
};

export type StockExchange = {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
};

export type UserType = "assistant" | "user";

export type ChatItem = {
  type: UserType;
  content: ReactNode;
};
