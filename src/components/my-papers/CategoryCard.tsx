import { twMerge } from "tailwind-merge";
import TrendIndicator from "../common/TrendIndicator";
import SubscriptionTimer from "../common/SubscriptionTimer";
import { useAuth } from "@/lib/provider/auth-provider";
import { BsFileCheckFill } from "react-icons/bs";
import { BoughtProduct } from "@/lib/types/my-papers";
import { formatToIndianNumberingSystem } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { FaLock } from "react-icons/fa6";
import { Button } from "../ui/button";
import { PLAN } from "@/lib/routes";
import { useApp } from "@/lib/provider/app-provider";
import { useRouter } from "next/router";

interface CategoryCardProps {
  category: { slug: string; name: string };
  className: string;
  onClick?: () => void;
  isSelected?: boolean;
  portfolioProducts: BoughtProduct[];
  boughtProducts: BoughtProduct[];
  isLoading: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  className,
  onClick = () => {},
  isSelected = false,
  portfolioProducts = [],
  boughtProducts,
  isLoading,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { products } = useApp();
  const { subscription } = user;
  const categryProducts = portfolioProducts.filter(
    (p) => p.categorySlug === category.slug
  );
  const { totalBuyPrice, totalMarketPrice } = categryProducts.reduce(
    (acc, product) => {
      acc.totalBuyPrice += product.buyPrice;
      acc.totalMarketPrice += product.marketPrice ?? 0;
      return acc;
    },
    { totalBuyPrice: 0, totalMarketPrice: 0 }
  );

  const TotalNet = totalMarketPrice
    ? ((totalMarketPrice - totalBuyPrice) / totalMarketPrice) * 100
    : 0;

  const isNotBought =
    boughtProducts.filter((p) => p.categorySlug === category.slug).length === 0;

  const handlePlanPageRedirect = () => {
    const planId = products.find(
      (product) => product.productCategories.nodes[0].slug === category.slug
    )?.id;
    router.push(`${PLAN}/${planId}`);
  };

  return (
    <div
      className={twMerge(
        "p-6 mx-3 hidden rounded-2xl md:flex flex-col justify-between min-h-64",
        className
      )}
      onClick={onClick}
    >
      <div className="grid gap-2">
        <h1 className="font-bold text-2xl flex justify-between items-center">
          {category.name} {isSelected ? <BsFileCheckFill /> : <></>}
        </h1>
        <div className="text-base">
          Papers:&nbsp;
          <span className="font-bold">{categryProducts.length}</span>
        </div>
        {subscription[category.slug] ? (
          <>
            <div className="text-base">
              Plan:&nbsp;
              <span className="font-bold">
                {subscription[category.slug].plan}
              </span>
            </div>
            <SubscriptionTimer duration={subscription[category.slug].period} />
          </>
        ) : null}
      </div>

      {!isNotBought ? (
        <div className="grid gap-2">
          {isSelected && !isLoading ? (
            <>
              <div className="flex justify-start items-center gap-3">
                <p className="text-lg font-semibold">Total:</p>
                <div className="text-sm font-bold">
                  ₹{formatToIndianNumberingSystem(totalBuyPrice)}
                </div>
              </div>
              <div className="flex justify-start items-center gap-3">
                <p className="text-lg font-semibold">Market:</p>
                <div className="text-sm font-bold ">
                  ₹{formatToIndianNumberingSystem(totalMarketPrice)}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="flex justify-start gap-3 items-center">
            <p className="text-lg font-semibold">Net:</p>
            {isLoading ? (
              <Skeleton className="h-10 w-40" />
            ) : (
              <TrendIndicator number={TotalNet} />
            )}
          </div>
        </div>
      ) : (
        <div
          className={twMerge(
            "flex flex-col justify-between ",
            isSelected ? "gap-12" : "gap-5"
          )}
        >
          <Button
            className={twMerge(
              isSelected ? "!text-lg" : "!py-2 !px-4 w-fit mx-auto text-base"
            )}
            onClick={handlePlanPageRedirect}
          >
            Buy {category.name}
          </Button>
          <div className="flex items-center gap-3 text-base font-semibold">
            <FaLock size={24} /> <p>{category.name} is locked</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
