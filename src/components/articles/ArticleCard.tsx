import React from "react";
import Link from "next/link";
import AnimateOnce from "../common/AnimateOnce";
import LazyImage from "../ui/lazy-image";
import { Post } from "@/lib/types/articles";
import { twMerge } from "tailwind-merge";

type ArticleCardProps = Post & {
  formatDateToReadable: (dateString: string) => string;
  inSideView?: boolean;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  node,
  formatDateToReadable,
  inSideView = false,
}) => {
  const { slug, link, featuredImage, title, excerpt, date } = node;
  return (
    <Link key={slug} href={link} target="_blank">
      <AnimateOnce>
        <div
          className={twMerge(
            "bg-white rounded-lg shadow-lg overflow-hidden grid",
            inSideView
              ? "h-full space-y-3 grid-cols-3"
              : "h-[420px] grid-cols-1"
          )}
        >
          <div className={inSideView ? "h-full" : "h-48"}>
            <LazyImage
              height={300}
              width={200}
              src={featuredImage.node.sourceUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 pb-4 justify-between flex flex-col col-span-2">
            <h2 className="text-xl font-bold mb-2">{title}</h2>

            <p
              className="line-clamp-3 text-gray-600 mb-4"
              dangerouslySetInnerHTML={{
                __html: excerpt.replace(/\[&hellip;\]/g, "..."),
              }}
            />

            <p className="text-sm italic">
              posted at&nbsp;
              <span className="font-semibold">
                {formatDateToReadable(date)}
              </span>
            </p>
          </div>
        </div>
      </AnimateOnce>
    </Link>
  );
};

export default ArticleCard;
