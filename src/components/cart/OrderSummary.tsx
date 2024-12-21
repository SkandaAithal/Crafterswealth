import { useAuth } from "@/lib/provider/auth-provider";
import {
  AuthActionTypes,
  SessionObject,
  UserDetails,
} from "@/lib/types/common/user";
import React, { useEffect, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { CHECKOUT } from "@/lib/routes";
import { calculateSubtotal, calculateTax, calculateTotal } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { Cart } from "@/lib/types/products";
import { Input } from "../ui/input";
import { useMutation } from "@apollo/client";
import { APPLY_COUPON_MUTATION } from "@/lib/queries/products.query";
import { IoIosCheckmarkCircle, IoMdClose } from "react-icons/io";
import { useApp } from "@/lib/provider/app-provider";
import { AppActionTypes } from "@/lib/types/common/app";
import { produce } from "immer";
import { toast } from "@/lib/hooks/use-toast";
import { UPDATE_USER_META } from "@/lib/queries/users.query";
import { getSession } from "next-auth/react";

const OrderSummary = ({
  isCheckout = false,
  stateProp = "",
  setIsCouponLoading,
}: {
  isCheckout?: boolean;
  stateProp?: string;
  setIsCouponLoading?: React.Dispatch<boolean>;
}) => {
  const router = useRouter();
  const { user, authDispatch } = useAuth();
  const { cart, state } = user as UserDetails;
  const { appDispatch, payment, latestProducts } = useApp();

  const [couponCode, setCouponCode] = useState<string>("");
  const [error, setError] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: "",
  });

  const stateArg = stateProp ? stateProp : state;
  const subtotalWithoutDiscount = calculateSubtotal(cart);
  const [subtotal, setTotal] = useState<number>(subtotalWithoutDiscount);
  const { sgst, cgst, igst } = calculateTax(subtotal, stateArg);
  const total: number = calculateTotal(subtotal, sgst, cgst, igst);
  const roundOff: number = total - (subtotal + sgst + cgst + igst);

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
    },
    onError: () => {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const shouldUpdateCart = useMemo(() => {
    return !cart.every((cartItem) => {
      const latestProduct = latestProducts[cartItem.category];
      return (
        latestProduct &&
        latestProduct.id === cartItem.productId.toString() &&
        cartItem.period === "0"
      );
    });
  }, [cart, latestProducts]);

  const updateCartToLatestProduct = async () => {
    const session = await getSession();
    const updatedCart = cart.map((cartItem) => {
      const latestProduct = latestProducts[cartItem.category];
      return {
        ...cartItem,
        productId: Number(latestProduct.id),
      };
    });

    const variables = {
      variables: {
        input: {
          email: user.email,
          cart: updatedCart,
        },
      },
    };

    await updateUserMeta({
      ...variables,
      context: {
        headers: {
          Authorization: `Bearer ${(session as SessionObject).authToken}`,
        },
      },
    });
  };

  useEffect(() => {
    if (subtotalWithoutDiscount) setTotal(subtotalWithoutDiscount);
  }, [subtotalWithoutDiscount, user]);

  const [applyCoupon, { data, loading: couponLoading }] = useMutation(
    APPLY_COUPON_MUTATION,
    {
      onCompleted(data) {
        if (data.applyCustomDiscount.percentageApplied && couponCode) {
          appDispatch({
            type: AppActionTypes.SET_COUPONCODE,
            payload: [couponCode.toLowerCase()],
          });

          setTotal(data.applyCustomDiscount.discountedTotal);

          setError({
            isError: false,
            message: data.applyCustomDiscount.message,
          });
        } else {
          setError({
            isError: true,
            message: data.applyCustomDiscount.message,
          });
        }
      },
      onError() {
        setError({
          isError: true,
          message: "An error occurred. Please try again.",
        });
      },
    }
  );

  useEffect(() => {
    if (setIsCouponLoading) {
      setIsCouponLoading(couponLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponLoading]);

  const discountPercentage = data?.applyCustomDiscount?.percentageApplied;

  const handleApplyCoupon = async () => {
    if (couponCode) {
      const productIds = cart.map((item) => item.productId.toString());
      await applyCoupon({
        variables: {
          input: {
            couponCode,
            productIds,
            totalAmount: subtotalWithoutDiscount,
          },
        },
      });
    } else {
      setError({
        isError: true,
        message: "Please enter a coupon code.",
      });
    }
  };

  const handleDeleteCoupon = () => {
    appDispatch({
      type: AppActionTypes.SET_COUPONCODE,
      payload: [],
    });
    setCouponCode("");
    setTotal(subtotalWithoutDiscount);
    setError({
      isError: false,
      message: "",
    });
  };

  const handleBtnClick = async () => {
    if (shouldUpdateCart) {
      await updateCartToLatestProduct();
    }
    router.push(CHECKOUT);
  };

  return (
    <div
      className={twMerge(
        isCheckout ? "" : "border rounded-md p-5 ",
        "w-full h-fit"
      )}
    >
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2 text-lg">
        <span className="font-bold">Product</span>
        <span className="font-bold">Subtotal</span>
      </div>
      {cart.map((item: Cart, index: number) => (
        <div key={index} className="flex justify-between mb-2 text-base">
          <div>{item.name}</div>
          <p>₹{item.price.toFixed(2)}</p>
        </div>
      ))}
      {isCheckout && (
        <div className="flex justify-between items-center my-4">
          <div className="w-full">
            <div
              className={twMerge(
                "flex items-center justify-between border rounded-full p-1 h-12",
                error.isError ? "border-2 border-destructive" : ""
              )}
            >
              <Input
                placeholder="Enter Coupon Code"
                value={
                  payment.coupons.length >= 1 ? payment.coupons[0] : couponCode
                }
                className="border-none rounded-full"
                disabled={couponLoading}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              {payment.coupons.length >= 1 ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteCoupon();
                  }}
                  className="!h-10 bg-destructive hover:bg-red-600"
                >
                  <IoMdClose className="text-white" size={20} />
                </Button>
              ) : (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleApplyCoupon();
                  }}
                  className="!h-10"
                  loading={couponLoading}
                >
                  Apply
                </Button>
              )}
            </div>
            {error.message && (
              <p
                className={`mt-1 ml-3 text-sm flex items-center gap-1 ${
                  error.isError ? "text-destructive" : "text-green-500"
                }`}
              >
                {error.message} {!error.isError && <IoIosCheckmarkCircle />}
              </p>
            )}
          </div>
        </div>
      )}
      <Separator />

      <div className="text-base grid gap-2 my-4">
        {!!(discountPercentage && payment.coupons.length) && (
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Discount</span>
              <span className="text-gray-500 font-bold text-sm">
                -{discountPercentage}% off
              </span>
            </div>
            <span> -₹{(subtotalWithoutDiscount - subtotal).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        {stateArg === "Karnataka" ? (
          <>
            <div className="flex justify-between">
              <span className="font-semibold">SGST</span>
              <span>₹{sgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">CGST</span>
              <span>₹{cgst.toFixed(2)}</span>
            </div>
          </>
        ) : (
          <div className="flex justify-between">
            <span className="font-semibold">IGST</span>
            <span>₹{igst.toFixed(2)}</span>
          </div>
        )}
        {roundOff ? (
          <div className="flex justify-between">
            <span className="font-semibold">Round Off</span>
            <span>₹{roundOff.toFixed(2)}</span>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Separator className="!h-[0.5px]" />

      <div className="flex justify-between mt-4 font-bold text-xl">
        <span>Total</span>

        <span>₹{Math.round(total).toFixed(2)}</span>
      </div>

      {!isCheckout && (
        <div className="flex justify-center mt-8">
          <Button
            className="w-full max-w-96"
            onClick={handleBtnClick}
            loading={loading}
          >
            Checkout Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
