import { Plan } from "./plan";

export interface ProductCategory {
  id: string;
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

export interface ProductsPageProps {
  products: ProductNode[];
}
