export interface CountryOption {
  value: string;
  label: React.ReactNode;
  geoNameId: number;
  countryCode: string;
}

export interface StateOption {
  value: string;
  label: string;
  geoNameId: number;
}
export interface CityOption {
  value: string;
  label: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export enum OrderStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export interface InvoiceData {
  invoiceMetadata: {
    invoiceNumber: string;
    invoiceDate: string;
    paymentMethod: string;
  };
  buyerDetails: {
    name: string;
    email: string;
    phone: string;
    address: {
      area: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  orderDetails: {
    orderNumber: string;
    orderDate: string;
    placeOfSupply: string;
  };
  items: Array<{
    slNo: string | number;
    name: string;
    subProducts: string[];
    hsnCode: string;
    quantity: number;
    amount: number;
    period: string;
  }>;
  taxDetails: {
    isWithinState: boolean;
    sgst: number;
    cgst: number;
    igst: number;
    totalTax: number;
    amountInWords: string;
  };
  coupons: string[];
  totals: {
    subtotal: number;
    grandTotal: number;
    amountInWords: string;
  };
}
