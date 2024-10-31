import React, { useMemo, useState, useRef } from "react";
import Portfolio from "./Portfolio";
import { Separator } from "../ui/separator";
import { BoughtProduct, InvestmentStatus } from "@/lib/types/my-papers";
import { GET_PRODUCTS_BY_IDS } from "@/lib/queries/products.query";
import { useAuth } from "@/lib/provider/auth-provider";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "@/lib/hooks/use-toast";
import AnimateOnce from "../common/AnimateOnce";
import Title from "../common/Title";
import MyPapersCard from "./MyPapersCard";
import { useApp } from "@/lib/provider/app-provider";
import { Button } from "../ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import useStockData from "@/lib/hooks/use-stock-data";
import { UPDATE_USER_META } from "@/lib/queries/users.query";
import { SessionObject } from "@/lib/types/common/user";
import { getSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { isTokenExpired } from "@/lib/utils/auth";
import { useRouter } from "next/router";
import { PLAN } from "@/lib/routes";

const MyPapersParentComponent = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<InvestmentStatus>(
    InvestmentStatus.HIGHEST_POTENTIAL
  );
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);
  const { user, redirectTrigger, setRedirectTrigger } = useAuth();
  const { boughtObject, categories, products } = useApp();
  const categoryName =
    categories.find((c) => c.slug === selectedCategory)?.name ?? "";
  const SYMBOLS = useMemo(
    () => boughtProducts.map((item) => item.stockSymbol),
    [boughtProducts]
  );
  // Pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const separatorRef = useRef<HTMLDivElement>(null);
  const { stockData, loading: stocksLoading } = useStockData(SYMBOLS);
  const [loadingIndexes, setLoadingIndexes] = useState<string[]>([]);

  const allUniqueItems = useMemo(() => {
    return Array.from(new Set(Object.values(boughtObject).flat()));
  }, [boughtObject]);

  const boughtArray = useMemo(() => {
    return user.bought.length ? [...allUniqueItems, ...user.bought] : [];
  }, [allUniqueItems, user.bought]);

  const [updateUserMeta, { loading: userMetaUpdating }] =
    useMutation(UPDATE_USER_META);

  const { loading: productsLoading } = useQuery(GET_PRODUCTS_BY_IDS, {
    variables: { payload: boughtArray },
    skip: !user?.bought?.length,
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      if (data?.productsByIds) {
        const products = data.productsByIds.map((product: BoughtProduct) => ({
          ...product,
          marketPrice: null,
        }));
        setBoughtProducts(products);
      }
    },
    onError: () => {
      toast({
        title: "Oops! Something went wrong",
        description: "Couldn't fetch your products",
        variant: "destructive",
      });
    },
  });

  const handleUpdateUserMetaData = async (
    key: keyof typeof user,
    payload: string[],
    index: number
  ) => {
    const session = await getSession();
    if (isTokenExpired(session?.expires) || !user.id) {
      return setRedirectTrigger(!redirectTrigger);
    }

    const keyIndexIdentifier = `${key}_${index}`;
    setLoadingIndexes((prev) => [...prev, keyIndexIdentifier]);

    try {
      await updateUserMeta({
        variables: {
          input: {
            email: user.email,
            [key]: payload,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${(session as SessionObject).authToken}`,
          },
        },
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoadingIndexes((prev) =>
        prev.filter((id) => id !== keyIndexIdentifier)
      );
    }
  };

  const sortByPotential = (
    products: BoughtProduct[],
    order: "asc" | "desc"
  ) => {
    const sortedProducts = [...products];
    return sortedProducts.sort((a, b) => {
      const potentialA = a.marketPrice
        ? ((a.target - a.marketPrice) / a.marketPrice) * 100
        : 0;
      const potentialB = b.marketPrice
        ? ((b.target - b.marketPrice) / b.marketPrice) * 100
        : 0;

      return order === "desc"
        ? potentialB - potentialA
        : potentialA - potentialB;
    });
  };

  const productsWithMarketPrice = useMemo(() => {
    return boughtProducts.map((product) => {
      if (stocksLoading) return product;

      const marketPrice =
        stockData.find((item) => item.symbol === product.stockSymbol)?.price ||
        0;

      return { ...product, marketPrice };
    });
  }, [boughtProducts, stockData, stocksLoading]);

  const filteredProductsByCategory = useMemo(() => {
    return productsWithMarketPrice
      .filter((product) => product.categorySlug === selectedCategory)
      .reverse();
  }, [productsWithMarketPrice, selectedCategory]);

  const filteredProductsByStatus = useMemo(() => {
    if (selectedStatus === InvestmentStatus.HIGHEST_POTENTIAL) {
      return sortByPotential(filteredProductsByCategory, "desc");
    } else if (selectedStatus === InvestmentStatus.LOWEST_POTENTIAL) {
      return sortByPotential(filteredProductsByCategory, "asc");
    } else if (selectedStatus === InvestmentStatus.VIEWED) {
      return filteredProductsByCategory.filter((product) =>
        user.productsViewed.includes(product.id)
      );
    } else if (selectedStatus === InvestmentStatus.NOT_VIEWED) {
      return filteredProductsByCategory.filter(
        (product) => !user.productsViewed.includes(product.id)
      );
    } else if (selectedStatus === InvestmentStatus.INVESTED) {
      return filteredProductsByCategory.filter((product) =>
        user.productsInvested.includes(product.id)
      );
    } else if (selectedStatus === InvestmentStatus.NOT_INVESTED) {
      return filteredProductsByCategory.filter(
        (product) => !user.productsInvested.includes(product.id)
      );
    } else {
      return [];
    }
  }, [
    filteredProductsByCategory,
    selectedStatus,
    user.productsInvested,
    user.productsViewed,
  ]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProductsByStatus.slice(start, start + itemsPerPage);
  }, [filteredProductsByStatus, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProductsByStatus.length / itemsPerPage);

  const scrollToSeparator = () => {
    if (separatorRef.current) {
      window.scrollTo({
        top: separatorRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      scrollToSeparator();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      scrollToSeparator();
    }
  };

  const handlePlanPageRedirect = () => {
    const planId = products.find(
      (product) => product.productCategories.nodes[0].slug === selectedCategory
    )?.id;
    router.push(`${PLAN}/${planId}`);
  };

  const latestProduct = filteredProductsByCategory[0];
  const portfolioProducts =
    user.productsInvested.length > 0
      ? productsWithMarketPrice.filter((p) =>
          user.productsInvested.includes(p.id)
        )
      : productsWithMarketPrice;

  return (
    <div className="space-y-5 md:space-y-8">
      <AnimateOnce>
        <Portfolio
          isProductsLoading={productsLoading}
          selectedProductCategory={selectedCategory}
          setProductCategory={setSelectedCategory}
          portfolioProducts={portfolioProducts}
          boughtProducts={productsWithMarketPrice}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          scrollToTop={scrollToSeparator}
          isMarketPriceLoading={stocksLoading}
          setCurrentPage={setCurrentPage}
        />
      </AnimateOnce>

      <div className="layout-sm !pt-0 space-y-5 md:space-y-8 ">
        {latestProduct && <Separator />}
        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-80 md:h-60" />
          </div>
        ) : (
          latestProduct && (
            <div>
              <Title text="Latest paper" size="H2" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MyPapersCard
                  {...latestProduct}
                  isLoading={stocksLoading}
                  loadingIndexes={loadingIndexes}
                  isUpdating={userMetaUpdating}
                  handleUpdateUserMetaData={handleUpdateUserMetaData}
                />
              </div>
            </div>
          )
        )}

        <Separator className="h-[0.5px]" ref={separatorRef} />

        {productsLoading ? (
          <div className=" min-h-[calc(100dvh-150px)] md:min-h-[calc(100dvh-170px)] grid grid-cols-1 md:grid-cols-2 place-content-center gap-8">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <Skeleton key={index} className="h-80 md:h-60" />
            ))}
          </div>
        ) : !filteredProductsByCategory.length ? (
          <div className="grid place-content-center gap-5 min-h-[60dvh]">
            <h1 className="text-xl md:text-2xl font-semibold text-center">
              No papers are available for {categoryName}
            </h1>
            <Button onClick={handlePlanPageRedirect} className="w-80 mx-auto">
              Buy {categoryName} plans
            </Button>
          </div>
        ) : paginatedProducts.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
            {paginatedProducts.map((prdct, index) => (
              <MyPapersCard
                {...prdct}
                isLoading={stocksLoading}
                key={prdct.id}
                loadingIndexes={loadingIndexes}
                isUpdating={userMetaUpdating}
                handleUpdateUserMetaData={handleUpdateUserMetaData}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className=" min-h-[calc(100dvh-150px)] md:min-h-[calc(100dvh-170px)] grid place-content-center">
            <div className="text-lg font-semibold text-center">
              No papers are available for the {selectedStatus} category in&nbsp;
              {categoryName} at this time.
            </div>
          </div>
        )}
        {paginatedProducts.length ? (
          <div className="flex justify-center items-center gap-10 mt-4">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              variant="transparent"
              className={twMerge(
                "!p-3 rounded-full hover:bg-accent shadow-md disabled:opacity-50",
                currentPage === 1 ? "bg-slate-200" : ""
              )}
            >
              <IoIosArrowBack />
            </Button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              variant="transparent"
              className={twMerge(
                "!p-3 rounded-full hover:bg-accent shadow-md disabled:opacity-50",
                currentPage === totalPages ? "bg-slate-200" : ""
              )}
            >
              <IoIosArrowForward />
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyPapersParentComponent;
