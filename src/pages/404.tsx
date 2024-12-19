import SEOHead from "@/components/seo/SeoHead";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/lazy-image";
import { PRODUCTS } from "@/lib/routes";
import { useRouter } from "next/router";

import React from "react";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <>
      <SEOHead title="Page not found" description="This page does not exist" />
      <main className="min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)] flex flex-col items-center justify-items-start text-center layout pb-16 !pt-0">
        <div className="w-fit">
          <LazyImage
            src="/404-image.png"
            alt="A graphic illustration representing a missing page or error"
            height={400}
            width={400}
            className="mx-auto"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
          <p className="text-lg text-gray-600">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <Button
            onClick={() => {
              router.push(PRODUCTS);
            }}
          >
            Go to Dashboard
          </Button>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
