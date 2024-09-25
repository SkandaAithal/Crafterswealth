import Image from "next/image";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "./skeleton";
import { isEmpty } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  isLazyLoad?: boolean;
  skeletonClassName?: string;
  width?: number;
  height?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  isLazyLoad = false,
  width,

  height,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageDimensions = width && height ? { width, height } : {};
  useEffect(() => {
    if (src && !isLazyLoad) {
      setTimeout(() => setImageUrl(src), 1000);
    } else {
      setImageUrl(src);
    }
  }, [isLazyLoad, src]);

  const handleLoad = () => {
    setIsImageLoaded(true);
  };

  const handleError = () => {
    setImageUrl("/placeholder-error-image.jpg");
  };

  return (
    <div className="relative h-full w-full">
      {!isImageLoaded && (
        <Skeleton
          className={twMerge(
            "object-cover w-full h-full absolute inset-0",
            skeletonClassName
          )}
        />
      )}

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={alt}
          fill={isEmpty(imageDimensions)}
          onLoad={handleLoad}
          onError={handleError}
          className={twMerge(
            "object-cover transition-opacity duration-200",
            className,
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          sizes="50dvw"
          {...imageDimensions}
        />
      )}
    </div>
  );
};

export default LazyImage;
