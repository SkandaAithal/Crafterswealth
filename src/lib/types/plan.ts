export interface PlanDetail {
  benefits: string;
  button_text: string;
  description: string;
  period: string;
  price: number;
  type: string;
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
  plans: Plan[];
  checkIfPremium?: (v: boolean) => void;
}
