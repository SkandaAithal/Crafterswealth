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
