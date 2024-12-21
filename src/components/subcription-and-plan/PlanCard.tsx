import React, { useState } from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { PlanDetail } from "@/lib/types/plan";
import { FaCheck } from "react-icons/fa";
import { decodeNumericId, formatToIndianNumberingSystem } from "@/lib/utils";
import { useApp } from "@/lib/provider/app-provider";
import { useParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useAuth } from "@/lib/provider/auth-provider";
import { getSession } from "next-auth/react";
import { AuthActionTypes, SessionObject } from "@/lib/types/common/user";
import { UPDATE_USER_META } from "@/lib/queries/users.query";
import { toast } from "@/lib/hooks/use-toast";
import { useRouter } from "next/router";
import { CART, MY_PAPERS, PRODUCTS } from "@/lib/routes";
import { produce } from "immer";
import { Cart } from "@/lib/types/products";
import {} from "@/lib/utils/auth";

interface PlanCardProps {
  plan: PlanDetail | null;
  className?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, className = "" }) => {
  const router = useRouter();
  const { products } = useApp();
  const {
    user,
    setRedirectTrigger,
    redirectTrigger,
    authDispatch,
    isAuthenticated,
    isUserSubscribedToEitherCategory,
  } = useAuth();
  const param = useParams();
  const slug = param?.slug ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const isNotSubscription = plan?.period === "0";
  const isSinglePaperBought =
    isUserSubscribedToEitherCategory() && isNotSubscription;
  const [updateUserMeta, { loading }] = useMutation(UPDATE_USER_META, {
    onCompleted: (data) => {
      const cartData = data?.updateUserMeta?.data;
      const updatedUser = produce(user, (draft) => {
        draft.cart = cartData;
      });

      authDispatch({
        type: AuthActionTypes.SET_USER_DETAILS,
        payload: updatedUser,
      });
      router.push(CART);
    },
    onError: () => {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again to add to cart",
        variant: "destructive",
      });
    },
  });

  const product = products.find((p) => p.id === slug);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSinglePaperBought) {
      router.push(MY_PAPERS);
      return;
    }
    setIsLoading(true);
    const session = await getSession();
    if (!isAuthenticated() || !user.id) {
      return setRedirectTrigger(!redirectTrigger);
    }

    const productId = decodeNumericId(slug as string);

    let cartArray = user.cart as Cart[];

    if (!product || !plan) {
      setIsLoading(false);
      router.push(PRODUCTS);
      return;
    }

    const category = product.productCategories.nodes[0].slug;
    const cartProduct = {
      productId,
      id: product.id,
      name: plan.access.length ? "Bundle Offer" : product.name,
      productName: isNotSubscription ? product.name : plan.type,
      category: category,
      regularPlanPrice: plan.regular_price,
      price: plan.sale_price,
      period: plan.period,
      access: plan.access,
      description: plan.description,
      plan: plan.type,
      hsnCode: product.hsnCode,
    };

    if (cartProduct.access.length) {
      const temp = cartArray.filter((cartItem) => {
        return (
          !cartProduct.access.includes(cartItem.category) &&
          !cartProduct.access.some((item) => cartItem.access.includes(item))
        );
      });

      cartArray = [cartProduct, ...temp];
    } else if (
      cartArray.some((item) => item.productId === cartProduct.productId)
    ) {
      cartArray = cartArray.map((item) =>
        item.productId === cartProduct.productId ? cartProduct : item
      );
    } else {
      cartArray = [cartProduct, ...cartArray];
    }

    const variables = {
      variables: {
        input: {
          email: user.email,
          cart: cartArray,
        },
      },
    };

    updateUserMeta({
      ...variables,
      context: {
        headers: {
          Authorization: `Bearer ${(session as SessionObject).authToken}`,
        },
      },
    });
    setIsLoading(false);
  };

  const planType = plan?.type || "Unavailable Plan";
  const planPrice = plan?.sale_price ? plan.sale_price : "Price Unavailable";
  const regularPlanPrice = plan?.regular_price ? plan.regular_price : "";
  const planDescription = plan?.description || "Description Unavailable";
  const buttonText = plan?.button_text || "Learn More";
  const benefitsList = plan?.benefits
    ? plan.benefits.split("|")
    : ["No Benefits Available"];
  const isMostPopular = plan?.most_popular;

  return (
    <div
      className={twMerge(
        "pr-6 py-10 rounded-lg shadow-xl cursor-default bg-primary text-center flex flex-col justify-between relative overflow- group transition-all duration-300 hover:scale-105 ",
        isMostPopular ? "border-2 border-primary-blue" : "",
        className
      )}
    >
      {isMostPopular ? (
        <div className="text-sm font-bold bg-primary-blue p-1 w-36 rounded-md left-1/2 -translate-x-1/2 text-white absolute -top-3.5 z-30">
          Most popular
        </div>
      ) : (
        <></>
      )}
      <div className="absolute rounded-lg inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-cover  bg-primary-blue-80 bg-top bg-plan-bg-image" />
      <div className="absolute rounded-lg inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-primary-blue-100 via-primary-blue-80 via-40% via-[#2244a1] via-55% to-transparent" />

      <div className="relative z-20 space-y-6">
        <div className="flex flex-col justify-between items-center gap-6 min-h-52">
          <div className="space-y-5 pl-6 group-hover:text-primary">
            <h2 className="text-xl md:text-2xl font-bold">{planType}</h2>
            <p className="text-base">{planDescription}</p>
          </div>

          <div className="text-5xl font-bold bg-[#7ed8ff] shadow-lg group-hover:text-black w-full flex justify-center items-end gap-2 p-4 rounded-r-full">
            <div className="">
              <span className="align-top text-xl">₹</span>
              {formatToIndianNumberingSystem(Number(planPrice))}
            </div>
            <div className="text-2xl flex justify-center text-slate-500">
              <span className="align-top text-base">₹</span>
              <div className="line-through">
                {formatToIndianNumberingSystem(Number(regularPlanPrice))}
              </div>
            </div>
          </div>
        </div>

        <ul className="text-left space-y-1 text-base pl-6 group-hover:text-primary">
          {benefitsList.map((benefit, index) => (
            <li
              key={`${planType}-${index}`}
              className="flex items-center gap-2"
            >
              <div className="self-start">
                <FaCheck className="text-green-400 mt-1.5" size={14} />
              </div>
              <p> {benefit.trim()}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="pl-6">
        <Button
          className="relative z-20 w-2/3  mx-auto mt-6"
          loading={loading || isLoading}
          onClick={handleAddToCart}
        >
          {isSinglePaperBought ? "Already Unlocked" : buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
