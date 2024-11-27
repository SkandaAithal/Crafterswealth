import Title from "@/components/common/Title";
import TradingViewTicker from "@/components/home-page/TradingViewTicker";
import MyPapersParentComponent from "@/components/my-papers/MyPapersParentComponent";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import { SYMBOLS_DATA } from "@/lib/constants";
import { MY_PAPERS } from "@/lib/routes";

const MyPapers = () => {
  const pageName = "My Papers - Manage Your Portfolio";
  const pageDescription =
    "View and manage your portfolio of research papers with CraftersWealth. Access detailed insights and track your progress in one place.";

  return (
    <main>
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="portfolio, research papers, stock analysis, CraftersWealth"
      />
      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={MY_PAPERS}
      />
      <section className="layout banner-2 pb-10">
        <Title text="My portfolio" className="text-center md:text-left" />
      </section>
      <section className="h-16">
        <TradingViewTicker symbols={SYMBOLS_DATA} />
      </section>
      <section className="min-h-screen pb-14 !pt-10 md:pt-6">
        <MyPapersParentComponent />
      </section>
    </main>
  );
};

export default MyPapers;
