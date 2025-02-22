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

export enum UserType {
  ASSISTANT = "assistant",
  USER = "user",
}

export enum ContentType {
  TEXT = "text",
  EXCHANGE_LIST = "exchangeList",
  STOCK_MENU = "stockMenu",
  STOCK_DETAILS = "stockDetails",
}

export type ChatItem = {
  type: UserType;
  contentType: ContentType;
  textContent?: string;
  exchangeData?: StockExchange;
  stockData?: Stock;
};
