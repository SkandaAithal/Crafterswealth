import React, { ReactNode, useEffect } from "react";
import { useApp } from "./app-provider";
import usePlaceOrder from "../hooks/use-place-order";
import { useAuth } from "./auth-provider";
import axios from "axios";
import { HOME, MAILCHIMP_TAGS_API, PAGE_MAP } from "../routes";
import { usePathname } from "next/navigation";

const UtilityWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { triggerInvoice } = useApp();
  const pathName = usePathname();
  const source =
    Object.keys(PAGE_MAP)
      .sort((a, b) => b.length - a.length)
      .find((key) => pathName?.startsWith(key)) || HOME;
  const { completeOrderPlacementFlow } = usePlaceOrder();

  const addOrUpdateMailchimpUserTags = async () => {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      country,
      city,
      state,
      postcode,
      cart,
    } = user;
    try {
      const response = await axios.post(MAILCHIMP_TAGS_API, {
        email,
        firstName,
        lastName,
        source: PAGE_MAP[source as keyof typeof PAGE_MAP],
        phone: phoneNumber,
        tags: [cart[0].plan],
        address: {
          addr1: address,
          addr2: address,
          city: city,
          state: state,
          zip: postcode,
          country: country,
        },
      });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
    } catch {
      // No action required
    }
  };

  useEffect(() => {
    if (triggerInvoice) {
      completeOrderPlacementFlow();
      addOrUpdateMailchimpUserTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerInvoice]);
  return children;
};

export default UtilityWrapper;
