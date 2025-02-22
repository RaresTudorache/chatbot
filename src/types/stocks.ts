export type Stock = {
  code: string;
  name: string;
  price: number;
};

export type StockExchange = {
  code: string;
  name: string;
  topStocks: Stock[];
};
