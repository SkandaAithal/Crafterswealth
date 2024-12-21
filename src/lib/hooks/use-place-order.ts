import { useMutation } from "@apollo/client";
import { ACCOUNTS_EMAIL, OFFICIAL_EMAIL } from "../constants";
import { useAuth } from "../provider/auth-provider";
import { SEND_EMAIL_MUTATION, UPDATE_USER_META } from "../queries/users.query";
import { InvoiceData } from "../types/checkout";
import { generateInvoiceEmailTemplate } from "../utils/email-templates/invoice";
import useInvoiceGeneration from "./use-invoice-pdf";
import { toast } from "./use-toast";
import { useApp } from "../provider/app-provider";
import { AppActionTypes } from "../types/common/app";
import { OrderDetailsForSheet } from "../types/components/orders";
import { ORDERS_SHEET_API } from "../routes";
import axios from "axios";
import { produce } from "immer";
import {
  AuthActionTypes,
  SessionObject,
  UserOrders,
} from "../types/common/user";
import { getSession } from "next-auth/react";

const usePlaceOrder = () => {
  const { user, authDispatch } = useAuth();
  const { appDispatch, invoice } = useApp();
  const { generateInvoice } = useInvoiceGeneration();
  const [sendEmail] = useMutation(SEND_EMAIL_MUTATION);

  const [updateUserMeta] = useMutation(UPDATE_USER_META, {
    onCompleted: (data) => {
      const status = data?.updateUserMeta?.statusCode;
      const savedData = data?.updateUserMeta?.data;
      if (status === 200) {
        const updatedUser = produce(user, (draft) => {
          draft.savedData = savedData;
        });

        authDispatch({
          type: AuthActionTypes.SET_USER_DETAILS,
          payload: updatedUser,
        });
      }
    },
  });

  const updateUserSavedData = async (updatedOrders: UserOrders[]) => {
    const session = await getSession();

    const variables = {
      input: {
        email: user.email,
        savedData: {
          ...user.savedData,
          orders: updatedOrders,
        },
      },
    };

    await updateUserMeta({
      variables,
      context: {
        headers: {
          Authorization: `Bearer ${(session as SessionObject).authToken}`,
        },
      },
    });
  };

  const updateOrdersSheet = async (order: OrderDetailsForSheet) => {
    const { data } = await axios.post(ORDERS_SHEET_API, order);
    return data;
  };

  const completeOrderPlacementFlow = async () => {
    try {
      let pdfLink = invoice.pdfLink;
      let invoiceDataVariable = invoice.invoiceData;

      if (!invoice.pdfLink) {
        const { data, invoiceData } = await generateInvoice();
        pdfLink = data.wordpressMediaUrl ?? "";
        invoiceDataVariable = invoiceData as InvoiceData;

        appDispatch({
          type: AppActionTypes.SET_PDF_LINK,
          payload: pdfLink,
        });
      }

      const emailHtml = generateInvoiceEmailTemplate(
        invoiceDataVariable,
        pdfLink
      );
      const orderSheetData: OrderDetailsForSheet = {
        date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        orderNumber: invoiceDataVariable.orderDetails.orderNumber,
        status: "Completed",
        email: user.email,
        customer: `${user.firstName} ${user.lastName}`,
        customerType: user.bought.length > 0 ? "Regular" : "New",
        products: invoiceDataVariable.items.map((item) => item.name),
        itemsSold: invoiceDataVariable.items.length,
        invoiceNumber: invoiceDataVariable.invoiceMetadata.invoiceNumber,
        coupons: invoiceDataVariable.coupons,
        netSales: invoiceDataVariable.totals.subtotal,
        cgst: invoiceDataVariable.taxDetails.cgst,
        sgst: invoiceDataVariable.taxDetails.sgst,
        igst: invoiceDataVariable.taxDetails.igst,
        roundOff:
          Math.round(invoiceDataVariable.totals.grandTotal) -
          invoiceDataVariable.totals.grandTotal,
        netRevenue: Math.round(invoiceDataVariable.totals.grandTotal),
        invoice: pdfLink,
        attribution: "Website",
      };

      const newOrder: UserOrders = {
        orderNumber: invoiceDataVariable.orderDetails.orderNumber,
        invoiceNumber: invoiceDataVariable.invoiceMetadata.invoiceNumber,
        coupons: invoiceDataVariable.coupons,
        invoice: pdfLink,
        totalPaid: Math.round(invoiceDataVariable.totals.grandTotal),
        date: new Date().toISOString(),
        products: invoiceDataVariable.items.map((item) => ({
          name: item.name,
          productId: item.slNo,
          period: item.period,
        })),
      };
      const userOrders = user?.savedData?.orders ?? [];
      const updatedOrders =
        !newOrder?.orderNumber ||
        userOrders.some((order) => order.orderNumber === newOrder.orderNumber)
          ? userOrders
          : [...userOrders, newOrder];

      const updateUserPromise = updateUserSavedData(updatedOrders);
      const emailRecipients = [user.email, ACCOUNTS_EMAIL];
      const updateSheetPromise = updateOrdersSheet(orderSheetData);

      const emailPromises = emailRecipients.map((recipient) =>
        sendEmail({
          variables: {
            input: {
              body: emailHtml,
              from: OFFICIAL_EMAIL,
              subject: "Invoice Email",
              to: recipient,
            },
          },
        })
      );

      const results = await Promise.allSettled([
        updateSheetPromise,
        ...emailPromises,
        updateUserPromise,
      ]);

      const emailResults = results.slice(1);

      const emailSuccesses = emailResults.filter(
        (res) => res.status === "fulfilled" && res.value?.data?.sendEmail?.sent
      );

      const allEmailsSent = emailSuccesses.length === emailRecipients.length;

      if (allEmailsSent) {
        appDispatch({ type: AppActionTypes.CLEAR_ORDER });
        toast({
          title: "Invoice sent successfully",
          description: `Invoice sent to ${user.email}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return { completeOrderPlacementFlow };
};

export default usePlaceOrder;
