import Title from "@/components/common/Title";
import React from "react";
import { BLOGS_DATA } from "@/lib/constants"; // Make sure the path to your data is correct
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Typewriter from "@/components/common/TypeWriter";

const Articles: React.FC = () => {
  return (
    <main className="bg-gradient-to-b from-[#D3DDFF] to-white layout space-y-6 pb-16">
      <div>
        <Title text="Market Blogs" className="text-center" />
        <Typewriter
          text="Explore the latest insights and trends in the stock market. Stay updated with expert opinions, tips, and news on various financial topics."
          className="max-w-screen-md mx-auto text-center h-14"
        />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 layout">
        {BLOGS_DATA.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <Image
              height={200}
              width={200}
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="line-clamp-2 text-gray-600 mb-4">
              {blog.description}
            </p>
            <Button variant="ghost" className="mt-auto">
              Read More
            </Button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Articles;
