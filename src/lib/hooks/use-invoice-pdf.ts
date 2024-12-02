import { useAuth } from "@/lib/provider/auth-provider";
import { useApp } from "@/lib/provider/app-provider";
import useProcessOrder from "@/lib/hooks/use-order-payload";
import { toWords } from "number-to-words";
import { capitalizeWords } from "@/lib/utils";
import axios from "axios";
import { AppActionTypes } from "@/lib/types/common/app";
import { INVOICE_API, INVOICE_NUMBER_API } from "@/lib/routes";

const useInvoiceGeneration = () => {
  const { user } = useAuth();
  const { payment, categories, appDispatch, countries, invoiceNumber } =
    useApp();
  const { getSuccessOrderPayload } = useProcessOrder();
  const order = getSuccessOrderPayload();

  const generateInvoiceNumber = async () => {
    try {
      const response = await axios.post(INVOICE_NUMBER_API);
      const incrementalNumber = response.data.invoiceNumber;
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      const yearPart = `${currentYear.toString().slice(-2)}-${nextYear.toString().slice(-2)}`;
      const constantPart = "100";
      return `CFR/${yearPart}/${constantPart}${incrementalNumber}`;
    } catch {
      return "";
    }
  };

  const formatAmountInWords = (amount: number) => {
    const rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);
    const rupeesInWords = toWords(rupees).replace(/-/g, " ");
    const paiseInWords =
      paise > 0 ? `And ${toWords(paise).replace(/-/g, " ")} Paise` : "";
    return `Indian Rupees ${capitalizeWords(rupeesInWords)} ${capitalizeWords(paiseInWords)} Only`;
  };

  const generateInvoice = async () => {
    try {
      const isWithinState = order.billing.state === "Karnataka";
      const sgstCgstRate = isWithinState ? 9 : 0;
      const igstRate = isWithinState ? 0 : 18;
      const taxRate = isWithinState ? sgstCgstRate * 2 : igstRate;
      const subtotal = parseFloat(payment.order.subtotal);
      const totalTax = parseFloat(((subtotal * taxRate) / 100).toFixed(2));
      const grandTotal = parseFloat(payment.order.total);
      const countryName = countries.find(
        (country) => country.code === order.billing.country
      )?.name;
      const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      let invoiceNo = invoiceNumber;
      if (!invoiceNumber) {
        invoiceNo = await generateInvoiceNumber();
        appDispatch({
          type: AppActionTypes.SET_INVOICE_NUMBER,
          payload: invoiceNo,
        });
      }
      const invoiceData = {
        invoiceMetadata: {
          invoiceNumber: invoiceNo,
          invoiceDate: formattedDate,
          paymentMethod: order.paymentMethod,
        },
        buyerDetails: {
          name: `${order.billing.firstName} ${order.billing.lastName}`,
          email: order.billing.email,
          phone: order.billing.phone,
          address: {
            area: order.billing.address1,
            city: order.billing.city,
            state: order.billing.state,
            postalCode: order.billing.postcode,
            country: countryName ?? "",
          },
        },
        orderDetails: {
          orderNumber: payment.order.orderNumber,
          orderDate: formattedDate,
          placeOfSupply: order.billing.state,
        },
        items: user.cart.map((item) => {
          const subProducts = item.access.map((slug) => {
            const categoryName = categories.find((c) => c.slug === slug)?.name;
            return categoryName;
          });
          return {
            slNo: item.productId,
            name: item.productName,
            subProducts,
            hsnCode: item.hsnCode,
            quantity: 1,
            amount: item.price,
          };
        }),
        taxDetails: {
          isWithinState,
          sgst: isWithinState ? parseFloat((totalTax / 2).toFixed(2)) : 0,
          cgst: isWithinState ? parseFloat((totalTax / 2).toFixed(2)) : 0,
          igst: isWithinState ? 0 : totalTax,
          totalTax,
          amountInWords: formatAmountInWords(totalTax),
        },
        coupons: payment.coupons,
        totals: {
          subtotal,
          grandTotal,
          amountInWords: `Indian Rupees ${capitalizeWords(
            toWords(Math.round(grandTotal))
          )} Only`,
        },
      };
      const { data } = await axios.post(INVOICE_API, { invoiceData });
      return { data, invoiceData };
    } catch (error) {
      throw new Error("Failed to generate invoice.");
    }
  };

  return { generateInvoice };
};

export default useInvoiceGeneration;
