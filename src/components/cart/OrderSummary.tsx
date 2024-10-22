import { useAuth } from "@/lib/provider/auth-provider";
import { Cart } from "@/lib/types/common/products";
import { UserDetails } from "@/lib/types/common/user";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { CHECKOUT } from "@/lib/routes";

const OrderSummary = ({ isCheckout = false }: { isCheckout?: boolean }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { cart } = user as UserDetails;

  const calculateSubtotal = (): number => {
    return cart.reduce((total: number, item: Cart) => total + item.price, 0);
  };

  const calculateTax = (subtotal: number): { sgst: number; cgst: number } => {
    const taxRate = 0.18;
    const totalTax = subtotal * taxRate;
    const sgst = totalTax / 2;
    const cgst = totalTax / 2;
    return { sgst, cgst };
  };

  const calculateTotal = (
    subtotal: number,
    sgst: number,
    cgst: number
  ): number => {
    return Math.round(subtotal + sgst + cgst);
  };

  const handleBtnClick = () => {
    router.push(CHECKOUT);
  };
  const subtotal: number = calculateSubtotal();
  const { sgst, cgst } = calculateTax(subtotal);
  const total: number = calculateTotal(subtotal, sgst, cgst);
  const roundOff: number = total - (subtotal + sgst + cgst);

  return (
    <div className="p-5 border rounded-md w-full h-fit">
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
        <div className="flex justify-between">
          <span className="font-semibold">SGST</span>
          <span>₹{sgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">CGST</span>
          <span>₹{cgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Round Off</span>
          <span>₹{roundOff.toFixed(2)}</span>
        </div>
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderSummary;
