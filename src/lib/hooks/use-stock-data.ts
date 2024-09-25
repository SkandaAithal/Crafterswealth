import { useState, useEffect, useMemo } from "react";
import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY } from "../constants";
import { GET_STOCKS_API } from "../routes";

interface StockData {
  symbol: string;
  price: number;
  currency: string;
}

const useStockData = (symbols: string[]) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStockPrices = async () => {
    setError(null);
    try {
      const encryptedPayload = CryptoJS.AES.encrypt(
        JSON.stringify({ symbols }),
        ENCRYPTION_KEY
      ).toString();

      const response = await fetch(GET_STOCKS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: encryptedPayload }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }

      const { data: encryptedResponse } = await response.json();

      const decryptedBytes = CryptoJS.AES.decrypt(
        encryptedResponse,
        ENCRYPTION_KEY
      );
      const decryptedData = JSON.parse(
        decryptedBytes.toString(CryptoJS.enc.Utf8)
      );

      setStockData(decryptedData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const isMarketOpen = useMemo(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours();
    const currentMinute = currentTime.getUTCMinutes();

    // Convert IST to UTC. IST is UTC +5:30, so 9:00 AM IST = 3:30 AM UTC, and 4:00 PM IST = 10:30 AM UTC.
    const marketOpenTime = { hour: 3, minute: 30 }; // 9:00 AM IST in UTC
    const marketCloseTime = { hour: 10, minute: 30 }; // 4:00 PM IST in UTC

    const currentTotalMinutes = currentHour * 60 + currentMinute;
    const marketOpenTotalMinutes =
      marketOpenTime.hour * 60 + marketOpenTime.minute;
    const marketCloseTotalMinutes =
      marketCloseTime.hour * 60 + marketCloseTime.minute;

    return (
      currentTotalMinutes >= marketOpenTotalMinutes &&
      currentTotalMinutes <= marketCloseTotalMinutes
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchInInterval = async () => {
      await fetchStockPrices();

      if (isMarketOpen && isMounted) {
        setTimeout(fetchInInterval, 4000);
      }
    };

    if (symbols.length > 0) {
      fetchInInterval();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stockData, loading, error };
};

export default useStockData;
