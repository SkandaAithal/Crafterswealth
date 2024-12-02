import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import { ABOUT_US } from "@/lib/routes";
import React from "react";
import { RiStockFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { LuBrainCircuit } from "react-icons/lu";
import MasonryLayout from "@/components/about-us/MasonryLayout";
import {
  FaChartLine,
  FaCheckCircle,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";
const AboutUs = () => {
  const pageName = "About Us";
  const pageDescription =
    "Navigating the stock market is a journey filled with opportunities and challenges. At CraftersWealth, we make this journey simpler, more transparent, and rewarding for investors. With the financial world constantly evolving, our mission is to empower you with the tools, insights, and confidence needed to make informed decisions.";

  return (
    <main>
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="About CraftersWealth, financial research, investment insights, SEBI registered, financial expertise, investment strategies, trusted financial advisors, stock market analysis, transparent reports, cutting-edge technology, financial compliance, customer-first innovation"
      />

      <PageStructuredData
        name={pageName}
        description={pageDescription}
        url={ABOUT_US}
      />
      <>
        <section className="text-center banner-2 md:text-start layout grid place-content-center pb-16">
          <Title text={pageName} className="text-center" />
          <AnimateOnce>
            <p className="text-center max-w-screen-lg">{pageDescription}</p>

            <p className="text-center max-w-screen-lg mt-5">
              We believe that every investor deserves a partner who truly
              understands their goals and offers tailored solutions. Whether
              you&apos;re seeking consistent growth, strategic diversification,
              or exploring new markets, we are here to help you succeed.
            </p>
          </AnimateOnce>
        </section>
        <section className="layout">
          <Title text="Mission" size="H2" className="text-center !mb-10" />
          <AnimateOnce>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center">
              <div className="p-6 bg-[#d9ffce] shadow-lg rounded-2xl flex items-center gap-5">
                <div className="p-6 bg-white rounded-2xl">
                  <RiStockFill size={35} className="text-[#28d35b]" />
                </div>

                <div className="leading-relaxed  space-y-2">
                  <h1 className="font-semibold text-2xl">Mission</h1>
                  <p className="text-gray-600">
                    To democratize financial research
                  </p>
                </div>
              </div>
              <div className="p-6 bg-primary-blue-30 shadow-lg rounded-2xl flex items-center gap-5">
                <div className="p-6 bg-white rounded-2xl">
                  <LuBrainCircuit size={35} className="text-[#287dd3]" />
                </div>

                <div className="leading-relaxed  space-y-2">
                  <h1 className="font-semibold text-2xl">Mission</h1>
                  <p className="text-gray-600">
                    To democratize financial research
                  </p>
                </div>
              </div>
              <div className="p-6 bg-[#fff8ce] shadow-lg rounded-2xl flex items-center gap-5">
                <div className="p-6 bg-white rounded-2xl">
                  <LuBrainCircuit size={35} className="text-[#d38328]" />
                </div>

                <div className="leading-relaxed  space-y-2">
                  <h1 className="font-semibold text-2xl">Mission</h1>
                  <p className="text-gray-600">
                    To democratize financial research
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnce>
        </section>
        <section className="layout text-center">
          <Title text="Our Approach" size="H2" className="text-center !mb-6" />
          <AnimateOnce>
            <p className="mx-auto max-w-screen-lg">
              At CraftersWealth, we combine technology and expertise to simplify
              investment decisions for our clients. Our data-driven approach
              ensures that every recommendation is backed by robust research and
              strategic insights, enabling clients to achieve financial growth
              confidently.
            </p>
          </AnimateOnce>
        </section>
        <section className="layout max-w-4xl">
          <div className="mx-auto text-center">
            <Title
              text="What Sets Us Apart"
              size="H2"
              className="text-center !mb-10"
            />
            <AnimateOnce>
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
                {[
                  {
                    title: "Comprehensive Research",
                    description:
                      "From analyzing market trends to diving deep into stock fundamentals, we leave no stone unturned.",
                  },
                  {
                    title: "Transparent Pricing Models",
                    description:
                      "Cost-effective subscriptions provide access to premium research, ensuring value for every customer.",
                  },
                  {
                    title: "Transparency & Integrity",
                    description:
                      "We prioritize clear, honest communication to empower clients with confidence in their financial decisions.",
                  },
                  {
                    title: "Tech-Driven Solutions",
                    description:
                      "Our proprietary tools help identify medium- and short-term opportunities with exceptional success rates.",
                  },
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={twMerge(
                        "bg-primary shadow-lg rounded-2xl cursor-default p-8 md:h-64 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-t from-primary-blue-80 to-primary-blue-100 text-primary"
                      )}
                    >
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  );
                })}
              </section>
            </AnimateOnce>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 md:gap-10 layout">
          <MasonryLayout />

          <div className="order-1 lg:order-2">
            <Title
              text="The Team"
              className="text-center lg:text-left"
              noAnimate
            />
            <p className="text-gray-700 leading-relaxed mt-10 text-center lg:text-left">
              At CraftersWealth, we started with a simple yet powerful belief:
              every investor deserves access to high-quality financial research.
              Founded by a dynamic father-son duo, &nbsp;
              <strong>Raghu Srinivasan</strong> and <strong>Rishabh Rao</strong>
              , we blend decades of financial expertise with cutting-edge
              technology to bridge the gap between complex market data and
              actionable insights.
            </p>

            <p className="mt-4 text-center lg:text-left">
              From humble beginnings, our journey has always been about
              empowering individuals to make smarter investment decisions in an
              ever-changing financial landscape.
            </p>
          </div>
        </section>

        <section className="layout pb-16">
          <Title
            text="Why Trust Us"
            className="text-center"
            size="H2"
            noAnimate
          />
          <p className="text-center">
            At CraftersWealth, trust is at the heart of our services.
            Here&apos;s why you can rely on us:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 max-w-screen-xl mx-auto">
            <div className="hover:rounded-xl cursor-default p-5 text-center hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">
                <FaCheckCircle className="h-12 w-12 text-primary-blue-80" />
              </div>
              <h3 className="text-xl font-bold my-4">Proven Expertise</h3>
              <p className="text-gray-600 text-base">
                Over 40 years of financial expertise and cutting-edge
                technology. Our team delivers data-driven insights designed for
                real results.
              </p>
            </div>
            <div className="hover:rounded-xl cursor-default p-5 text-center hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">
                <FaShieldAlt className="h-12 w-12 text-primary-blue-80" />
              </div>
              <h3 className="text-xl font-bold my-4">
                SEBI-Registered & Compliant
              </h3>
              <p className="text-gray-600 text-base">
                Our adherence to strict regulatory standards ensures
                transparency, ethical practices, and accountability.
              </p>
            </div>
            <div className="hover:rounded-xl cursor-default p-5 text-center hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">
                <FaChartLine className="h-12 w-12 text-primary-blue-80" />
              </div>
              <h3 className="text-xl font-bold my-4">
                Actionable and Transparent Reports
              </h3>
              <p className="text-gray-600 text-base">
                We provide clear, easy-to-understand research with proven
                strategies and no hidden agendas.
              </p>
            </div>
            <div className="hover:rounded-xl cursor-default p-5 text-center hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">
                <FaCogs className="h-12 w-12 text-primary-blue-80" />
              </div>
              <h3 className="text-xl font-bold my-4">
                Customer-First Innovation
              </h3>
              <p className="text-gray-600 text-base">
                Tailored solutions powered by technology and human expertise,
                aligned with your financial goals.
              </p>
            </div>
          </div>
        </section>
      </>
    </main>
  );
};

export default AboutUs;
