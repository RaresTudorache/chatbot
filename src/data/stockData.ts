import stockData from "./stockData.json";
import { StockExchange } from "../types/stocks";

export const getStockData = (): StockExchange[] => {
  try {
    return stockData as StockExchange[];
  } catch (error) {
    console.error("Error loading stock data:", error);
    return [];
  }
};
