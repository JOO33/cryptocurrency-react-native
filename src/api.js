/**
  Interface for the Crypto Compare API 
  https://min-api.cryptocompare.com/
  @flow
 */
import axios from "axios";

const APIBaseURL = "https://min-api.cryptocompare.com";

export const HISTORICAL_HOURLY_DATA = "histohour";
export const HISTORICAL_DAILY_DATA = "histoday";
export const MUTIPLE_SYMBOLS_PRICE = "pricemulti";

export type HistoryResponse = {
  Reponse: string,
  Type: number,
  Aggregated: boolean,
  Data: Array<{
    time: number,
    close: number,
    high: number,
    low: number,
    open: number,
    volumefrom: number,
    volumeto: number
  }>,
  TimeFrom: number,
  TimeTo: number,
  FirstValueInArray: boolean,
  ConversionType: string,
  conversionSymbol: string
};

export type CurrencyUnit = "USD" | "BTC";
export type PriceMultiResponse = {
  [symbol: string]: {
    [CurrencyUnit]: number
  }
};

export const get = async (query: string): Promise<Object> => {
  const response = await axios.get(`${APIBaseURL}/${query}`);
  return response;
};

export const getAllCurrentPrices = async (
  coinSymbolsList: Array<string>
): Promise<Object> => {
  const symbolsString = coinSymbolsList.join(",");
  const response = await get(
    `data/${MUTIPLE_SYMBOLS_PRICE}?fsyms=${symbolsString}&tsyms=USD`
  );
  return response;
};

export const getYesterdayData = async (coinSymbol: string): Promise<HistoryResponse> => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const timestampYesterday = timestamp - 24 * 3600;
  const response = await get(
    `data/${HISTORICAL_HOURLY_DATA}?fsym=${coinSymbol}&tsym=USD&limit=1&toTs=${timestampYesterday}`
  );
  return response;
};

export const getTodayData = async (coinSymbol: string): Promise<Object> => {
  const response = await get(
    `data/histohour?fsym=${coinSymbol}&tsym=USD&limit=1&toTs=${timestampYesterday}`
  );
  return response;
};

export const getHistoricalData = async (
  coinSymbol: string
): Promise<Object> => {
  const response = await get(
    `data/histohour?fsym=${coinSymbol}&tsym=USD&limit=1&toTs=${timestampYesterday}`
  );
  return response;
};

export const parseYesterdayData = (response: HistoryResponse): number => {};
