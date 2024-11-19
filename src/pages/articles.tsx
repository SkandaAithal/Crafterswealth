import Title from "@/components/common/Title";
import React from "react";
import Typewriter from "@/components/common/TypeWriter";
import ArticlesComponent from "@/components/articles/ArticlesComponent";

const Articles = () => {
  return (
    <main className="bg-gradient-to-b from-[#e1e8ff] to-white min-h-[calc(100dvh-75px)] md:min-h-[calc(100dvh-100px)] layout space-y-6 pb-16">
      <div>
        <Title text="Market Blogs" className="text-center" />
        <Typewriter
          text="Explore the latest insights and trends in the stock market. Stay updated with expert opinions, tips, and news on various financial topics."
          className="max-w-screen-md mx-auto text-center h-14"
        />
      </div>
      <ArticlesComponent />
    </main>
  );
};

export default Articles;
