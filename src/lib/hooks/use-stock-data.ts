import { useState, useEffect, useMemo } from "react";
import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY } from "../constants";
import { GET_STOCKS_API } from "../routes";
import axios from "axios";

interface StockData {
  symbol: string;
  price: number;
  currency: string;
}

const useStockData = (symbols: string[], stopPoll = false) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStockPrices = async () => {
    setError(null);
    try {
      if (symbols.length) {
        const encryptedPayload = CryptoJS.AES.encrypt(
          JSON.stringify({ symbols }),
          ENCRYPTION_KEY
        ).toString();

        const response = await axios.post(
          GET_STOCKS_API,
          {
            payload: encryptedPayload,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data: encryptedResponse } = response.data;

        const decryptedBytes = CryptoJS.AES.decrypt(
          encryptedResponse,
          ENCRYPTION_KEY
        );
        const decryptedData = JSON.parse(
          decryptedBytes.toString(CryptoJS.enc.Utf8)
        );

        setStockData(decryptedData);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Market is open from 9 AM to 4 PM IST (3:30 AM - 10:30 AM UTC).
  const isMarketOpen = useMemo(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours();
    const currentMinute = currentTime.getUTCMinutes();
    const currentDay = currentTime.getUTCDay(); // Sunday = 0, Saturday = 6

    // Convert IST to UTC: 9:00 AM IST = 3:30 AM UTC, 4:00 PM IST = 10:30 AM UTC
    const marketOpenTime = { hour: 3, minute: 30 }; // 9:00 AM IST in UTC
    const marketCloseTime = { hour: 10, minute: 30 }; // 4:00 PM IST in UTC

    const currentTotalMinutes = currentHour * 60 + currentMinute;
    const marketOpenTotalMinutes =
      marketOpenTime.hour * 60 + marketOpenTime.minute;
    const marketCloseTotalMinutes =
      marketCloseTime.hour * 60 + marketCloseTime.minute;

    // Check if it's a weekend (Saturday or Sunday)
    const isWeekend = currentDay === 0 || currentDay === 6;

    return (
      !isWeekend &&
      currentTotalMinutes >= marketOpenTotalMinutes &&
      currentTotalMinutes <= marketCloseTotalMinutes
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchInInterval = async () => {
      await fetchStockPrices();

      if (isMarketOpen && isMounted && !stopPoll) {
        setTimeout(fetchInInterval, 10000);
      }
    };

    if (symbols.length > 0) {
      fetchInInterval();
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMarketOpen, symbols]);

  return { stockData, loading, error };
};

export default useStockData;
