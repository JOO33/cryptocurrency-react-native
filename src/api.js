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

export type ApiCategory =
  | typeof HISTORICAL_HOURLY_DATA
  | typeof HISTORICAL_DAILY_DATA
  | typeof MUTIPLE_SYMBOLS_PRICE;

export type HistoricalQueryParams = {
  apiCategory: ApiCategory,
  data: {
    fsym: string,
    tsym: string,
    aggregate: number,
    limit: number
  }
};

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

export type PriceMultiResponse = {
  [symbol: string]: {
    ["USD"]: number
  }
};

export const get = async (query: string): Promise<Object> => {
  const response = await axios.get(`${APIBaseURL}/${query}`);
  return response;
};

export const getAllCurrentPrices = async (
  coinSymbolsList: Array<string>
): Promise<PriceMultiResponse> => {
  const symbolsString = coinSymbolsList.join(",");
  const response = await get(
    `data/${MUTIPLE_SYMBOLS_PRICE}?fsyms=${symbolsString}&tsyms=USD`
  );
  return response;
};

export const getYesterdayData = async (
  coinSymbol: string
): Promise<HistoryResponse> => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const timestampYesterday = timestamp - 24 * 3600;
  const response = await get(
    `data/${HISTORICAL_HOURLY_DATA}?fsym=${coinSymbol}&tsym=USD&limit=1&toTs=${timestampYesterday}`
  );
  return response;
};

export const getTodayData = async (
  coinSymbol: string
): Promise<HistoryResponse> => {
  const timestampMidnight = new Date().setHours(0, 0, 0, 0);
  const response = await get(
    `data/histohour?fsym=${coinSymbol}&tsym=USD&limit=1&toTs=${timestampMidnight}`
  );
  return response;
};

export const getHistoricalData = async (
  query: HistoricalQueryParams
): Promise<HistoryResponse> => {
  const { apiCategory } = query;
  const { fsym, tsym, aggregate, limit } = query.data;
  const response = await get(
    `data/${apiCategory}?fsym=${fsym}&tsym=${tsym}&limit=${limit}&aggregate=${aggregate}`
  );
  return response;
};
