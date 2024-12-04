import { FaArrowRightLong } from "react-icons/fa6";
import AnimateOnce from "../common/AnimateOnce";
import LazyImage from "../ui/lazy-image";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { PLAN, PRODUCTS_DETAIL } from "@/lib/routes";
import TrendIndicator from "../common/TrendIndicator";

interface ProductCardProps {
  product: {
    featuredImage: { node: { sourceUrl: string; altText: string } };
    id: string;
    name: string;
    productCategories: { nodes: { name: string; slug: string }[] };
    stock: { stockSymbol: string; target: number; description: string };
  };
  currentPrice: number;
  loading: boolean;
}

const ProductCard = ({ product, currentPrice, loading }: ProductCardProps) => {
  const router = useRouter();
  const { featuredImage, id, name, productCategories, stock } = product;
  const potential = currentPrice
    ? ((stock.target - currentPrice) / currentPrice) * 100
    : 0;
  const handleBuyNowClick = (id: string) => {
    router.push(`${PLAN}/${id}`);
  };

  const handleReadMoreClick = (slug: string, id: string) => {
    router.push(`${PRODUCTS_DETAIL}/?type=${slug}&id=${id}`);
  };

  return (
    <AnimateOnce key={id}>
      <div className="relative transition-all duration-300 md:hover:scale-105 group h-auto cursor-default text-primary md:text-black md:hover:text-primary">
        <div className="absolute z-20 -top-10 left-1/2 w-24 h-24 -translate-x-1/2 bg-black md:bg-blue-950 group-hover:bg-black rounded-full p-3 transition-colors duration-300">
          <LazyImage
            className="m-auto object-contain h-full w-full"
            src={featuredImage?.node?.sourceUrl ?? ""}
            alt={featuredImage?.node?.altText ?? ""}
            height={60}
            width={60}
            skeletonClassName="rounded-full"
          />
        </div>

        <div className="relative text-center space-y-4 bg-accent rounded-xl shadow-lg px-6 pt-12 pb-10 overflow-hidden">
          <div className="absolute opacity-100 inset-0 z-0 md:opacity-0 bg-[#353faf] transition-opacity duration-300 group-hover:opacity-100 bg-product-bg-img bg-cover bg-top"></div>
          <div className="absolute opacity-100 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100 inset-0 z-10 bg-gradient-to-t from-primary-blue-100 via-primary-blue-80 via-50% via-[#2244a1] via-65% to-transparent"></div>

          <div className="relative z-10 space-y-4">
            <h1 className="font-bold text-2xl">
              {(productCategories?.nodes ?? []).map((a) => a.name).join(", ")}
            </h1>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{name}</h2>
              <div className="space-y-3">
                <div className="space-y-2">
                  <p>Remaining Growth Potential</p>
                  <div className="flex items-center justify-center gap-1 !my-5 text-4xl font-extrabold">
                    {loading ? (
                      <Skeleton className="h-10 w-3/5 " />
                    ) : (
                      <TrendIndicator number={potential} className="text-4xl" />
                    )}
                  </div>
                </div>

                <div className="text-base">
                  <p className="line-clamp-2">{stock.description}</p>
                  <span
                    onClick={() =>
                      handleReadMoreClick(
                        (productCategories?.nodes ?? []).map((a) => a.slug)[0],
                        id
                      )
                    }
                    className="cursor-pointer text-primary-blue w-fit mx-auto font-semibold flex gap-1 items-center justify-center"
                  >
                    Read more <FaArrowRightLong />
                  </span>
                </div>
                <Button
                  onClick={() => handleBuyNowClick(id)}
                  className="shadow rounded-full w-1/2 md:hidden mx-auto !mt-4 block md:group-hover:block"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimateOnce>
  );
};

export default ProductCard;
