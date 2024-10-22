export interface PlanDetail {
  benefits: string;
  button_text: string;
  description: string;
  period: string;
  most_popular: boolean;
  type: string;
  regular_price: number;
  sale_price: number;
  access: string[];
}

export interface Plan {
  name: string;
  plans: PlanDetail[];
}

export interface Product {
  id: string;
  plans: Plan[];
}

export interface ProductResponse {
  product: Product;
}

export interface PlanPageProps {
  loading: boolean;
  plans: Plan[];
  checkIfPremium: (v: boolean) => void;
}
