export interface OrderItem {
  imageUrl: string;
  name: string;
}

export interface Order {
  country: string;
  datePaid: string;
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  items: OrderItem[];
}

export interface PublicOrderResponse {
  publicOrders: Order[];
}

export interface OrderDetailsForSheet {
  date: string;
  orderNumber: string;
  status: string;
  email: string;
  customer: string;
  customerType: string;
  products: string[];
  itemsSold: number;
  invoiceNumber: string;
  coupons: string[];
  netSales: number;
  cgst: number;
  sgst: number;
  igst: number;
  roundOff: number;
  netRevenue: number;
  invoice: string;
  attribution: string;
}
