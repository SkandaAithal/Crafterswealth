import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { formatToIndianNumberingSystem } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import AnimateOnce from "../common/AnimateOnce";
import TrendIndicator from "../common/TrendIndicator";
import { MyPapersCardsProps } from "@/lib/types/my-papers";
import { Button } from "../ui/button";
import { TbLoader3 } from "react-icons/tb";
import { useAuth } from "@/lib/provider/auth-provider";
import { twMerge } from "tailwind-merge";
import { AuthActionTypes } from "@/lib/types/common/user";
import { produce } from "immer";
import { useRouter } from "next/router";
import { Checkbox } from "@/components/ui/checkbox";

const MyPapersCard: React.FC<MyPapersCardsProps> = ({
  buyPrice,
  target,
  name,
  file,
  stockName,
  marketPrice = 0,
  isLoading = false,
  loadingIndexes,
  isUpdating = false,
  index,
  id,
  handleUpdateUserMetaData,
}) => {
  const router = useRouter();
  const { user, authDispatch } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const potential = marketPrice
    ? ((target - marketPrice) / marketPrice) * 100
    : 0;
  const isTargetReached = potential <= 0;
  const profitFromTarget = ((target - buyPrice) / buyPrice) * 100;

  const productsViewdKey = "productsViewed";
  const productsInvestedKey = "productsInvested";
  const isPaperViewed = user.productsViewed.includes(id);
  const isPaperInvested = !user.productsInvested.includes(id);

  useEffect(() => {
    if (isPaperInvested) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [isPaperInvested, user.productsInvested]);

  const handleViewPaper = async () => {
    if (isUpdating) return;
    if (!isPaperViewed) {
      const payload = [...user.productsViewed, id];

      await handleUpdateUserMetaData(productsViewdKey, payload, index!);

      const updatedUser = produce(user, (draft) => {
        draft.productsViewed = payload;
      });

      authDispatch({
        type: AuthActionTypes.SET_USER_DETAILS,
        payload: updatedUser,
      });
      router.push(file);
    } else {
      window.open(file, "_blank");
    }
  };

  const handleCheckboxChange = async (checked: boolean) => {
    if (isUpdating) return;

    setIsChecked(checked);
    if (isPaperInvested) {
      const payload: string[] = [...user.productsInvested, id];

      await handleUpdateUserMetaData(productsInvestedKey, payload, index!);

      const updatedUser = produce(user, (draft) => {
        draft.productsInvested = payload;
      });

      authDispatch({
        type: AuthActionTypes.SET_USER_DETAILS,
        payload: updatedUser,
      });
    } else {
      const payload = user.productsInvested.filter((pid) => pid !== id);

      await handleUpdateUserMetaData(productsInvestedKey, payload, index!);

      const updatedUser = produce(user, (draft) => {
        draft.productsInvested = payload;
      });

      authDispatch({
        type: AuthActionTypes.SET_USER_DETAILS,
        payload: updatedUser,
      });
    }
  };

  return (
    <AnimateOnce>
      <div
        className={twMerge(
          "space-y-4 rounded-2xl p-5 w-full md:w-full  mx-auto",
          loadingIndexes.includes(`${productsInvestedKey}_${index}`)
            ? "skeleton-loader"
            : "",
          isPaperInvested ? "bg-primary-blue-30" : "bg-accent"
        )}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-wrap">{stockName}</h1>
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold ml-2">Invest</div>

            <Checkbox
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
              className="bg-slate-300 h-6 w-6"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Button
            variant="transparent"
            onClick={handleViewPaper}
            className={twMerge(
              " flex text-xs md:text-base items-center gap-1",
              isPaperViewed ? "text-purple-900" : "text-red-800"
            )}
            disabled={isUpdating}
          >
            {isPaperViewed ? "Revisit Paper" : "View Paper"}
            {loadingIndexes.includes(`${productsViewdKey}_${index}`) ? (
              <TbLoader3 size={35} className="animate-spin" />
            ) : (
              <FaFilePdf size={35} />
            )}
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">
              Buy Price: &nbsp;
              <span className="font-bold text-xl">
                ₹ {formatToIndianNumberingSystem(buyPrice)}
              </span>
            </h3>
            <h3 className="text-lg font-semibold">
              Target: &nbsp;
              <span className="font-bold text-xl">
                ₹ {formatToIndianNumberingSystem(target)}
              </span>
            </h3>
          </div>
          <div className="mt-4 md:mt-0 flex md:flex-col items-center gap-3">
            <h3 className="text-lg font-semibold">
              {isTargetReached ? "Target Reached" : "Growth Potential"}
            </h3>
            {isLoading ? (
              <Skeleton className="h-10 w-28" />
            ) : (
              <TrendIndicator
                number={isTargetReached ? profitFromTarget : potential}
              />
            )}
          </div>
        </div>
      </div>
    </AnimateOnce>
  );
};

export default MyPapersCard;
