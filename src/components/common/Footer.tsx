import { FOOTER_ROUTES } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import Title from "./Title";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { PAGES_TO_HIDE_FOOTER } from "@/lib/routes";
import { usePathname } from "next/navigation";

import SubscribeToNewsLetter from "./SubscribeToNewsLetter";
import { MdOutlineMailOutline } from "react-icons/md";

const Footer = () => {
  const pathName = usePathname();

  if (PAGES_TO_HIDE_FOOTER.includes(pathName)) return null;

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 bg-gradient-to-r from-primary-blue-100 to-primary-blue-80">
        <div className="grid place-content-center gap-4 pt-10 md:pt-0 h-auto md:h-60">
          <Title
            text="Subscribe to our"
            className="text-primary !m-0 !font-extralight"
            size="H2"
          />
          <Title text="NewsLetter" className="text-primary !m-0" size="H1" />
        </div>
        <div className="col-span-2 h-40 md:h-60 px-4 flex justify-center items-center">
          <SubscribeToNewsLetter />
        </div>
      </section>
      <section className="text-center grid place-content-center gap-4 py-10 px-4 bg-gradient-to-b from-primary-blue-80 to-primary-blue-100 text-primary">
        <div className="flex justify-center gap-1">
          <Title text="CraftersWealth" className="text-primary" size="H2" />
          <p className="text-xs">TM</p>
        </div>
        <div className="flex justify-center gap-8 flex-wrap">
          {FOOTER_ROUTES.map((routemap, idx) => (
            <Link key={idx} href={routemap.route}>
              {routemap.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-10">
          <Link
            href="mailto:support@crafterswealth.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white p-4 rounded-full flex items-center justify-center">
              <MdOutlineMailOutline className="text-3xl text-black" />
            </div>
          </Link>
          <div className="bg-white p-4 rounded-full flex items-center justify-center">
            <FaInstagram className="text-3xl text-black" />
          </div>
          <div className="bg-white p-4 rounded-full flex items-center justify-center">
            <FaWhatsapp className="text-3xl text-black" />
          </div>
        </div>
        <h1 className="text-base">
          CRAFTERS FINANCIAL RESEARCH PRIVATE LIMITED (Research Analyst) | SEBI
          Regn., No. INH000016117
        </h1>
        <p>
          Copyright &copy; {new Date().getFullYear()} CraftersWealth
          <sup>™</sup>
        </p>
      </section>
    </>
  );
};

export default Footer;
