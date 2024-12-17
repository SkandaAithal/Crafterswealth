import { useMutation } from "@apollo/client";
import { ACCOUNTS_EMAIL, OFFICIAL_EMAIL } from "../constants";
import { useAuth } from "../provider/auth-provider";
import { SEND_EMAIL_MUTATION } from "../queries/users.query";
import { InvoiceData } from "../types/checkout";
import { generateInvoiceEmailTemplate } from "../utils/email-templates/invoice";
import useInvoiceGeneration from "./use-invoice-pdf";
import { toast } from "./use-toast";
import { useApp } from "../provider/app-provider";
import { AppActionTypes } from "../types/common/app";
import { OrderDetailsForSheet } from "../types/components/orders";
import { ORDERS_SHEET_API } from "../routes";
import axios from "axios";

const usePlaceOrder = () => {
  const { user } = useAuth();
  const { appDispatch, invoice } = useApp();
  const { generateInvoice } = useInvoiceGeneration();
  const [sendEmail] = useMutation(SEND_EMAIL_MUTATION);

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
      ]);

      const updateSheetResult = results[0];
      const emailResults = results.slice(1);

      const sheetUpdateSuccessful = updateSheetResult.status === "fulfilled";
      const emailSuccesses = emailResults.filter(
        (res) => res.status === "fulfilled" && res.value.data?.sendEmail?.sent
      );

      const allEmailsSent = emailSuccesses.length === emailRecipients.length;

      if (sheetUpdateSuccessful && allEmailsSent) {
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
