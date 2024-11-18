import { GET_PUBLIC_ORDERS } from "@/lib/queries/products.query";
import { OrderItem, PublicOrderResponse } from "@/lib/types/components/orders";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import LazyImage from "../ui/lazy-image";
import { twMerge } from "tailwind-merge";
import { useApp } from "@/lib/provider/app-provider";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import { RxCross2 } from "react-icons/rx";

const OrdersNotification = () => {
  const { countries } = useApp();
  const { isMobile } = useWindowWidth();
  const { data } = useQuery<PublicOrderResponse>(GET_PUBLIC_ORDERS, {
    fetchPolicy: "cache-first",
  });
  const orders = data?.publicOrders;
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const notificationSound = new Audio("/audio/notification.wav");

  const renderIcon = (orderItem: OrderItem[]) => {
    return (
      <div
        className={twMerge(
          "relative h-10 flex justify-center items-center",
          orderItem.length === 1 ? "w-10" : "w-20"
        )}
      >
        {orderItem.map((item, index) => {
          const middleIndex = (orderItem.length - 1) / 2;
          const offset = (index - middleIndex) * 20;

          return (
            <div
              key={index}
              className="absolute border rounded-full border-white bg-blue-950 w-10 h-10 p-2.5 overflow-hidden"
              style={{
                zIndex: orderItem.length + index,
                transform: `translateX(${offset}px)`,
              }}
            >
              <LazyImage
                key={index}
                src={item.imageUrl}
                alt={item.name}
                height={30}
                width={30}
                className="mx-auto object-contain"
                skeletonClassName="rounded-full"
              />
            </div>
          );
        })}
      </div>
    );
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (orders?.length && countries.length) {
        const currentOrder = orders[currentOrderIndex];
        const country = countries.find(
          (c) => c.code === currentOrder.country
        )?.name;
        const date = new Date(currentOrder.datePaid);

        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        };

        const formattedDate = date
          .toLocaleDateString("en-GB", options)
          .replace(",", "")
          .replace(/\s+/g, " ");
        const numberOfProductsBought = currentOrder.items.length;
        const titleText = `${currentOrder.firstName} in ${currentOrder.city}${isMobile ? "" : ` from ${currentOrder.state}`}, ${country}`;

        toast(titleText, {
          icon: renderIcon(currentOrder.items),
          classNames: {
            icon: numberOfProductsBought === 1 ? "w-10" : "w-20",
            toast: "md:w-[500px] md:p-6 pr-0  rounded-full overflow-hidden",
            title: "text-base",
          },
          cancel: {
            label: <RxCross2 size={20} />,
            onClick: () => {},
          },
          description: `Bought ${numberOfProductsBought} ${numberOfProductsBought === 1 ? "paper" : "papers"} on ${formattedDate}.`,
          position: "bottom-left",
        });
        setCurrentOrderIndex((prevIndex) => (prevIndex + 1) % orders.length);
        notificationSound.play();
      }
    }, 10000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, currentOrderIndex]);

  return <></>;
};

export default OrdersNotification;
