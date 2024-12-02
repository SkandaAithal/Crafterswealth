import React, { useEffect } from "react";
import LazyImage from "../ui/lazy-image";

const MasonryLayout: React.FC = () => {
  useEffect(() => {
    function reorderMasonryItems() {
      const masonryContainer = document.getElementById("masonry-container");
      const masonryItems = Array.from(masonryContainer?.children || []);

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      masonryItems.sort((a, b) => {
        const orderA = isDesktop
          ? parseInt(a.getAttribute("data-order-desktop") || "0")
          : parseInt(a.getAttribute("data-order-mobile") || "0");
        const orderB = isDesktop
          ? parseInt(b.getAttribute("data-order-desktop") || "0")
          : parseInt(b.getAttribute("data-order-mobile") || "0");
        return orderA - orderB;
      });

      masonryItems.forEach((item) => masonryContainer?.appendChild(item));
    }

    reorderMasonryItems();
    window.addEventListener("resize", reorderMasonryItems);

    return () => {
      window.removeEventListener("resize", reorderMasonryItems);
    };
  }, []);

  return (
    <div
      id="masonry-container"
      className="columns-1 md:columns-2 space-y-4 col-span-2 text-base order-2 lg:order-1"
    >
      <div
        className="break-inside-avoid flex justify-between "
        data-order-mobile="1"
        data-order-desktop="1"
      >
        <span className="hidden md:block"></span>
        <div className="w-full md:w-3/4">
          <LazyImage
            src="/authentication-bg-image.jpeg"
            alt=""
            height={400}
            width={300}
            className="w-full h-60 md:h-52"
          />
        </div>
      </div>
      <div
        className="text-base break-inside-avoid !mb-6"
        data-order-mobile="2"
        data-order-desktop="4"
      >
        <h3 className="text-2xl font-bold">Raghu Srinivasan</h3>
        <p className="italic text-gray-600">
          Co-Founder and Director – Financial Research
        </p>
        <p className="my-2">
          <strong>Qualifications:</strong> B.Com., F.C.A., DISA (ICAI), NISM
          (RA)
        </p>
        <p className="text-sm">
          With over 40 years of expertise in corporate finance, audit, and
          taxation, Raghu ensures our research is deeply rooted in sound
          financial principles. As a mentor and leader, he fosters a culture of
          integrity, enabling us to deliver reliable, actionable insights.
        </p>
      </div>
      <div
        className="break-inside-avoid flex justify-between"
        data-order-mobile="3"
        data-order-desktop="5"
      >
        <div className="w-full md:w-3/4">
          <LazyImage
            src="/authentication-bg-image.jpeg"
            alt=""
            height={400}
            width={300}
            className="w-full h-60 md:h-52"
          />
          <span className="hidden md:block"></span>
        </div>
      </div>
      <div
        className="text-base break-inside-avoid !mb-6"
        data-order-mobile="4"
        data-order-desktop="2"
      >
        <h3 className="text-2xl font-bold">Rishabh Rao</h3>
        <p className="italic text-gray-600">
          Co-Founder and Director – Technology and Research
        </p>
        <p className="my-2">
          <strong>Qualifications:</strong> B.E. (Computer Science)
        </p>
        <p className="text-sm">
          Rishabh blends his technical background and passion for finance to
          develop proprietary algorithms and scalable tools that deliver
          unparalleled success rates.
        </p>
      </div>
      <div
        className="break-inside-avoid flex justify-between"
        data-order-mobile="5"
        data-order-desktop="3"
      >
        <span className="hidden md:block"></span>
        <div className="w-full md:w-3/4">
          <LazyImage
            src="/authentication-bg-image.jpeg"
            alt=""
            height={400}
            width={300}
            className="w-full h-60 md:h-52"
          />
        </div>
      </div>
      <div
        className="text-base break-inside-avoid !mb-6"
        data-order-mobile="6"
        data-order-desktop="6"
      >
        <h3 className="text-2xl font-bold">Suraj Sridhar</h3>
        <p className="italic text-gray-600">
          Trainee – Quantitative Investment Analyst
        </p>
        <p className="my-2">
          <strong>Qualifications:</strong> B.Sc. (Mathematics & Statistics),
          pursuing M.Sc. in Statistics
        </p>
        <p className="text-sm">
          Suraj applies advanced statistical models to refine strategies and
          explore future opportunities. His growing expertise supports the
          creation of cutting-edge solutions for investors.
        </p>
      </div>
    </div>
  );
};

export default MasonryLayout;
