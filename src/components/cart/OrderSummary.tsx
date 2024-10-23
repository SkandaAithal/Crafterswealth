import { useAuth } from "@/lib/provider/auth-provider";
import { Cart } from "@/lib/types/common/products";
import { UserDetails } from "@/lib/types/common/user";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { CHECKOUT } from "@/lib/routes";
import { calculateSubtotal, calculateTax, calculateTotal } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

const OrderSummary = ({
  isCheckout = false,
  stateProp = "",
}: {
  isCheckout?: boolean;
  stateProp?: string;
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, state } = user as UserDetails;

  const stateArg = stateProp ? stateProp : state;
  const handleBtnClick = () => {
    router.push(CHECKOUT);
  };

  const subtotal: number = calculateSubtotal(cart);
  const { sgst, cgst, igst } = calculateTax(subtotal, stateArg);
  const total: number = calculateTotal(subtotal, sgst, cgst, igst);
  const roundOff: number = total - (subtotal + sgst + cgst + igst);

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
      <Separator />

      <div className="text-base grid gap-2 my-4">
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
        <span>₹{total.toFixed(2)}</span>
      </div>
      {!isCheckout ? (
        <div className="flex justify-center mt-8">
          <Button className="w-full max-w-96" onClick={handleBtnClick}>
            Checkout Now
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default OrderSummary;
