export type Stock = {
    code: string;
    stockName: string;
    price: number;
  }
  
  export type StockExchange = {
    code: string;
    stockExchange: string;
    topStocks: Stock[];
  }
  