import { getInitials } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LazyImage from "../ui/lazy-image";
import { SessionObject } from "@/lib/types/common/user";
import { useAuth } from "@/lib/provider/auth-provider";

const UserProfile = () => {
  const { data } = useSession();
  const session = data as SessionObject;
  const { user } = useAuth();
  const [animatedPurchases, setAnimatedPurchases] = useState(0);
  const [animatedInvested, setAnimatedInvested] = useState(0);

  const totalPurchases = user.bought.length || 0;
  const totalInvested = user.productsInvested.length || 0;

  const animateValue = (
    start: number,
    end: number,
    setValue: (val: number) => void
  ) => {
    let startTimestamp: number | null = null;
    const duration = 1000;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    animateValue(0, totalPurchases, setAnimatedPurchases);
    animateValue(0, totalInvested, setAnimatedInvested);
  }, [totalPurchases, totalInvested]);

  return (
    <div className="space-y-2 mb-6">
      {session && user && (
        <>
          {session?.user?.image ? (
            <div className="h-24 w-24 text-xl mx-auto grid place-content-center overflow-hidden text-center rounded-full cursor-pointer text-primary skeleton-loader">
              <LazyImage
                src={session.user.image}
                alt="User Avatar"
                height={150}
                width={150}
                className="h-24 w-24 object-cover"
              />
            </div>
          ) : (
            <div className="h-24 w-24 text-3xl mx-auto grid place-content-center overflow-hidden text-center rounded-full cursor-pointer text-primary bg-primary-blue-80">
              <p>{getInitials(`${user.firstName} ${user.lastName}`)}</p>
            </div>
          )}
          <div>
            <h1 className="font-semibold">{`${user.firstName} ${user.lastName}`}</h1>
            <p className="text-base text-slate-500">{user.email}</p>
          </div>
          <div className="mb-6 flex justify-center items-center gap-10">
            <p className="text-2xl font-semibold">
              Purchases: {animatedPurchases}
            </p>
            <p className="text-2xl font-semibold">
              Invested: {animatedInvested}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
