import Title from "@/components/common/Title";
import React from "react";
import { BLOGS_DATA } from "@/lib/constants";
import Typewriter from "@/components/common/TypeWriter";
import LazyImage from "@/components/ui/lazy-image";

const Articles: React.FC = () => {
  return (
    <main className="bg-gradient-to-b from-[#e1e8ff] to-white layout space-y-6 pb-16">
      <div>
        <Title text="Market Blogs" className="text-center" />
        <Typewriter
          text="Explore the latest insights and trends in the stock market. Stay updated with expert opinions, tips, and news on various financial topics."
          className="max-w-screen-md mx-auto text-center h-14"
        />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 layout md:pt-6">
        {BLOGS_DATA.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-lg flex overflow-hidden flex-col justify-between"
          >
            <LazyImage
              height={200}
              width={200}
              src={blog.image}
              alt={blog.title}
              isLazyLoad
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="line-clamp-2 text-gray-600 mb-4">
                {blog.description}
              </p>
              <p className="text-sm">
                <span className="italic">posted at </span>
                {blog.postedAt}
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Articles;
