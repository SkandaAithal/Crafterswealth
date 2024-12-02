import { UserDetails } from "./common/user";

export interface PortfolioProps {
  setProductCategory: React.Dispatch<string>;
  selectedProductCategory: string;
  isProductsLoading: boolean;
  portfolioProducts: BoughtProduct[];
  boughtProducts: BoughtProduct[];
  setSelectedStatus: React.Dispatch<InvestmentStatus>;
  selectedStatus: InvestmentStatus;
  scrollToTop: () => void;
  isMarketPriceLoading: boolean;
  setCurrentPage: React.Dispatch<number>;
}

export interface BoughtProduct {
  id: string;
  buyPrice: number;
  name: string;
  stockName: string;
  stockSymbol: string;
  target: number;
  file: string;
  categorySlug: string;
  marketPrice?: number;
  __typename: string;
}

export interface ProductsByIdsResponse {
  productsByIds: BoughtProduct[];
}

export interface MyPapersCardsProps
  extends Omit<BoughtProduct, "categorySlug" | "__typename" | "stockSymbol"> {
  isLoading: boolean;
  loadingIndexes: string[];
  isUpdating: boolean;
  index?: number;
  handleUpdateUserMetaData: (
    key: keyof UserDetails,
    payload: string[],
    index: number
  ) => Promise<void>;
}

export enum InvestmentStatus {
  HIGHEST_POTENTIAL = "High Potential",
  LOWEST_POTENTIAL = "Low Potential",
  // TARGETS_REACHED = "Achieved Targets",
  INVESTED = "Currently Invested",
  NOT_INVESTED = "Not Invested",
  VIEWED = "Viewed",
  NOT_VIEWED = "Not Viewed",
}
