import { Plan } from "./plan";

export interface ProductCategory {
  name: string;
  slug: string;
  threshold: number;
  image: {
    sourceUrl: string;
  };
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
  targetReached: boolean;
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
  categories?: ProductCategory[];
  productsLoading?: boolean;
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

export interface AllProducts {
  id: string;
  name: string;
}
export interface CategoryProductIds {
  [category: string]: AllProducts[];
}

export interface GetProductByCategoryData {
  allProductsByCategory: CategoryProductIds;
}
