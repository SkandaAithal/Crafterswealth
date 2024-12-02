import { Plan } from "./plan";

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}
export interface Stock {
  buyPrice: number;
  stockName: string;
  stockSymbol: string;
  target: number;
  description: string;
}

export interface ProductNode {
  id: string;
  name: string;
  hsnCode: string;
  productCategories: {
    nodes: ProductCategory[];
  };
  plans: Plan[];
  stock: Stock;
  featuredImage: FeaturedImage;
}

export interface ProductsData {
  products: {
    nodes: ProductNode[];
  };
}

export interface ProductsProps {
  products: ProductNode[];
}

export interface Cart {
  productId: number;
  id: string;
  name: string;
  category: string;
  price: number;
  period: string;
  productName: string;
  access: string[];
  regularPlanPrice: number;
  description: string;
  plan: string;
  hsnCode: string;
}

export interface CategoryProductIds {
  [category: string]: string[];
}

export interface GetProductIdsByCategoryData {
  allProductIdsByCategory: CategoryProductIds;
}
