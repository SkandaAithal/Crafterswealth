import AnimateOnce from "@/components/common/AnimateOnce";
import Title from "@/components/common/Title";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SEOHead from "@/components/seo/SeoHead";
import { ABOUT_US } from "@/lib/routes";
import React from "react";
import { twMerge } from "tailwind-merge";
import { LuBrainCircuit } from "react-icons/lu";
import {
  FaChartLine,
  FaCheckCircle,
  FaCogs,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import LazyImage from "@/components/ui/lazy-image";
const AboutUs = () => {
  const pageName = "About Us";
  const pageDescription =
    "At CraftersWealth, we simplify the complexities of the stock market, empowering you with tailored insights and transparent guidance. Your journey to confident and informed investing starts here.";

  return (
    <main>
      <SEOHead
        title={pageName}
        description={pageDescription}
        keywords="At CraftersWealth, we simplify the complexities of the stock market, empowering you with tailored insights and transparent guidance. Your journey to confident and informed investing starts here."
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
          </AnimateOnce>
        </section>
        <section className="layout">
          <Title text="Mission" size="H2" className="text-center !mb-10" />
          <AnimateOnce>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 items-center">
              <div className="p-6 bg-[#d9ffce] shadow-lg rounded-2xl flex items-center gap-5">
                <div className="p-6 bg-white rounded-2xl">
                  <LuBrainCircuit size={45} className="text-[#28d35b]" />
                </div>
                <div className="leading-relaxed space-y-2">
                  <h1 className="font-semibold text-2xl">Empowerment</h1>
                  <p className="text-gray-600">
                    Accurate, affordable insights for confident wealth-building.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-primary-blue-30 shadow-lg rounded-2xl flex items-center gap-5">
                <div className="p-6 bg-white rounded-2xl">
                  <HiOutlineLightBulb size={45} className="text-[#287dd3]" />
                </div>
                <div className="leading-relaxed space-y-2">
                  <h1 className="font-semibold text-2xl">Innovation</h1>
                  <p className="text-gray-600">
                    Revolutionizing financial research with advanced technology.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-[#fff8ce] shadow-lg rounded-2xl flex items-center gap-5">
                <div className="p-6 bg-white rounded-2xl">
                  <FaUsers size={45} className="text-[#d38328]" />
                </div>
                <div className="leading-relaxed space-y-2">
                  <h1 className="font-semibold text-2xl">Democratization</h1>
                  <p className="text-gray-600">
                    Empowering individuals with financial knowledge.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnce>
        </section>
        <section className="mx-auto text-center layout">
          <Title
            text="What Sets Us Apart"
            size="H2"
            className="text-center !mb-5"
          />

          <AnimateOnce>
            <p className="mx-auto max-w-screen-lg mb-10">
              At CraftersWealth, we combine technology and expertise to simplify
              investment decisions for our clients.
            </p>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-screen-md  mx-auto">
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
                      "bg-primary shadow-lg rounded-2xl cursor-default p-6  lg:h-48 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-t from-primary-blue-80 to-primary-blue-100 text-primary"
                    )}
                  >
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                );
              })}
            </section>
          </AnimateOnce>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 md:gap-10 layout">
          <div className="col-span-2 max-w-4xl mx-auto order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              <div className="w-full">
                <LazyImage
                  src="/authentication-bg-image.jpeg"
                  alt=""
                  height={400}
                  width={300}
                  className="w-full h-60 md:h-52"
                />
              </div>
              <div className="text-base">
                <h3 className="text-2xl font-bold">Raghu Srinivasan</h3>
                <p className="italic text-gray-600">
                  Co-Founder and Director – Financial Research
                </p>
                <p className="my-2">
                  <strong>Qualifications:</strong> B.Com., F.C.A., DISA (ICAI),
                  NISM (RA)
                </p>
                <p className="text-sm">
                  With over 40 years of expertise in corporate finance, audit,
                  and taxation, Raghu ensures our research is deeply rooted in
                  sound financial principles. As a mentor and leader, he fosters
                  a culture of integrity, enabling us to deliver reliable,
                  actionable insights.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-8">
              <div className="text-base md:order-1 order-2">
                <h3 className="text-2xl font-bold">Rishabh Rao</h3>
                <p className="italic text-gray-600">
                  Co-Founder and Director – Technology and Research
                </p>
                <p className="my-2">
                  <strong>Qualifications:</strong> B.E. (Computer Science)
                </p>
                <p className="text-sm">
                  Rishabh blends his technical background and passion for
                  finance to develop proprietary algorithms and scalable tools
                  that deliver unparalleled success rates.
                </p>
              </div>
              <div className="w-full md:order-2 order-1">
                <LazyImage
                  src="/authentication-bg-image.jpeg"
                  alt=""
                  height={400}
                  width={300}
                  className="w-full h-60 md:h-52"
                />
              </div>
            </div>
            {/* 
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-8">
              <div className="w-full">
                <LazyImage
                  src="/authentication-bg-image.jpeg"
                  alt=""
                  height={400}
                  width={300}
                  className="w-full h-60 md:h-52"
                />
              </div>
              <div className="text-base">
                <h3 className="text-2xl font-bold">Suraj Sridhar</h3>
                <p className="italic text-gray-600">
                  Trainee – Quantitative Investment Analyst
                </p>
                <p className="my-2">
                  <strong>Qualifications:</strong> M.Sc. in Business Analytics
                </p>
                <p className="text-sm">
                  Suraj applies advanced statistical models to refine strategies
                  and explore future opportunities. His growing expertise
                  supports the creation of cutting-edge solutions for investors.
                </p>
              </div>
            </div> */}
          </div>

          <div className="order-1 lg:order-2">
            <Title
              text="The Team"
              className="text-center lg:text-left"
              noAnimate
            />
            <p className=" mt-10 text-center lg:text-left">
              At CraftersWealth, we believe every investor deserves access to
              quality financial research. Founded by the dynamic father-son duo{" "}
              <strong>Raghu Srinivasan</strong> and <strong>Rishabh Rao</strong>
              , we combine decades of expertise with technology to turn market
              data into actionable insights. Our mission has always been to
              empower smarter investment decisions in a dynamic financial world.
            </p>

            <p className="mt-4 text-center lg:text-left hidden md:block">
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
