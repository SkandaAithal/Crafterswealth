import { useApp } from "@/lib/provider/app-provider";
import { useAuth } from "@/lib/provider/auth-provider";
import { Cart } from "@/lib/types/common/products";
import React, { useState } from "react";
import LazyImage from "../ui/lazy-image";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../ui/button";
import { convertToDaysOrHours } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_META } from "@/lib/queries/users.query";
import { AuthActionTypes, SessionObject } from "@/lib/types/common/user";
import { toast } from "@/lib/hooks/use-toast";
import { getSession } from "next-auth/react";
import { TbLoader3 } from "react-icons/tb";
import Link from "next/link";
import { PRODUCTS } from "@/lib/routes";
import { IoArrowBack } from "react-icons/io5";
import OrderSummary from "./OrderSummary";
import AnimateOnce from "../common/AnimateOnce";
import { useRouter } from "next/router";
import { produce } from "immer";

const CartComponent = () => {
  const router = useRouter();
  const { user, authDispatch, redirectTrigger, setRedirectTrigger } = useAuth();
  const cartArray = user.cart as Cart[];
  const { products } = useApp();
  const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);

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

  const { imageMap, slugNameMap } = products.reduce(
    (
      acc: {
        imageMap: { [key: string]: string };
        slugNameMap: { [key: string]: string };
      },
      product
    ) => {
      const categoryNode = product.productCategories.nodes[0];
      const categorySlug = categoryNode.slug;
      const categoryName = categoryNode.name;
      const imageUrl = product.featuredImage.node.sourceUrl;

      acc.imageMap[categorySlug] = imageUrl as string;
      acc.slugNameMap[categorySlug] = categoryName;

      return acc;
    },
    { imageMap: {}, slugNameMap: {} }
  );

  const handleDeleteCart = async (index: number) => {
    const session = await getSession();
    if (!session || !user.id) {
      return setRedirectTrigger(!redirectTrigger);
    }

    setLoadingIndexes((prev) => [...prev, index]);

    const updatedCartArray = cartArray.filter((_, idx) => idx !== index);

    const variables = {
      variables: {
        input: {
          email: user.email,
          cart: updatedCartArray,
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

    setLoadingIndexes((prev) => prev.filter((idx) => idx !== index));
  };

  return cartArray.length ? (
    <>
      <div className="layout !pt-5">
        <div className=" font-bold w-fit">
          <Link href={PRODUCTS}>
            <div className="flex gap-1 items-center">
              <IoArrowBack size={24} />
              Continue Exploring
            </div>
          </Link>
        </div>
      </div>
      <section className="grid grid-cols-1 xl:grid-cols-3 layout !pt-10 gap-y-10 xl:gap-10 pb-40">
        <div className="flex flex-col col-span-2 justify-start gap-6 cursor-default">
          {cartArray?.map((cart, index) => {
            const isBundlePlan = !!cart.access.length;
            const accessArray = isBundlePlan ? cart.access : [cart.category];

            return (
              <div key={cart.id}>
                <AnimateOnce>
                  <div className="flex gap-2 px-2">
                    {isBundlePlan ? (
                      accessArray.map((slug) => (
                        <div
                          key={slug}
                          className="text-xs w-fit bg-primary-blue text-white px-2 py-1 rounded-t-md whitespace-nowrap"
                        >
                          {slugNameMap[slug]}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs w-fit bg-primary-blue text-white px-2 py-1 rounded-t-md whitespace-nowrap">
                        {slugNameMap[cart.category]}
                      </div>
                    )}
                  </div>
                  <div
                    key={cart.productId}
                    className="border rounded-lg p-6 min-h-40 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                  >
                    <div className="relative w-60 h-20 flex justify-center items-center">
                      {accessArray.map((item, index) => {
                        const middleIndex = (accessArray.length - 1) / 2;
                        const offset = (index - middleIndex) * 50;

                        return (
                          <div
                            key={index}
                            className="absolute border rounded-full border-white bg-blue-950 w-20 h-20 p-2.5 overflow-hidden"
                            style={{
                              zIndex: accessArray.length + index,
                              transform: `translateX(${offset}px)`,
                            }}
                          >
                            <LazyImage
                              src={imageMap[item]}
                              alt={cart.name}
                              height={50}
                              width={50}
                              isLazyLoad
                              className="mx-auto object-contain"
                              skeletonClassName="rounded-full"
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 !justify-between text-left w-full">
                      <div className="flex flex-col justify-center gap-1 text-center md:text-left">
                        <h2 className="font-bold text-xl">{cart.name}</h2>
                        <h3 className="text-lg">{cart.plan}</h3>
                        <p className="text-sm">{cart.description}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-6 place-content-center md:min-w-72">
                        <div className="flex flex-col justify-start items-center gap-2 text-center h-full">
                          <h3 className="font-bold text-lg">Period</h3>
                          <p className="text-lg font-bold whitespace-nowrap">
                            {cart.period}
                            {cart.period !== "0" ? (
                              <p>&nbsp;({convertToDaysOrHours(cart.period)})</p>
                            ) : (
                              <></>
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-center gap-2 text-center h-full">
                          <h3 className="font-bold text-lg">Price</h3>
                          <div className="grid ">
                            <p className="text-lg font-bold">₹{cart.price}</p>
                            <span className="line-through text-gray-400 text-sm">
                              ₹{cart.regularPlanPrice}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center md:justify-end items-center">
                          <Button
                            variant="transparent"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteCart(index);
                            }}
                            className="flex justify-center text-red-600 hover:scale-110 transition-all duration-300"
                            disabled={loading}
                          >
                            {loadingIndexes.includes(index) ? (
                              <TbLoader3 size={28} className="animate-spin" />
                            ) : (
                              <AiOutlineDelete size={28} />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnce>
              </div>
            );
          })}
        </div>
        <AnimateOnce>
          <OrderSummary />
        </AnimateOnce>
      </section>
    </>
  ) : (
    <section className="layout !pt-4 !pb-16 grid place-content-center text-center gap-4">
      <LazyImage
        src="/empty-cart-image.jpg"
        width={200}
        height={200}
        isLazyLoad
        skeletonClassName="rounded-full h-64 w-64 m-auto"
        alt="empty cart"
        className="w-60 h-60 md:w-80 md:h-80 mx-auto"
      />
      <div>
        <h1 className="font-bold text-3xl">Your Cart is empty!</h1>
        <p>Looks like you haven&apos;t made your choice yet..</p>
      </div>
      <Button onClick={() => router.push(PRODUCTS)}>Explore</Button>
    </section>
  );
};

export default CartComponent;
