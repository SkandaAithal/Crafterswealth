import { addDurationToDate } from "@/lib/utils";
import { useEffect, useState } from "react";

const SubscriptionTimer: React.FC<{ duration: string }> = ({ duration }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const subscriptionEndDate = addDurationToDate(duration);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const remainingTime = subscriptionEndDate.getTime() - now.getTime();
      setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [subscriptionEndDate]);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {timeRemaining > 0 ? (
        <h2>Time Remaining: {formatTime(timeRemaining)}</h2>
      ) : (
        <h2>Subscription Expired</h2>
      )}
    </div>
  );
};

export default SubscriptionTimer;
