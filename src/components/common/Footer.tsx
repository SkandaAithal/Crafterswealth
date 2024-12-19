import { BOTTOM_FOOTER_ROUTES, FOOTER_ROUTES } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import Title from "./Title";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { PAGES_TO_HIDE_FOOTER } from "@/lib/routes";
import { usePathname } from "next/navigation";

import SubscribeToNewsLetter from "./SubscribeToNewsLetter";
import { MdOutlineMailOutline } from "react-icons/md";
import TooltipComponent from "../ui/tooltip";
import { IoWarningOutline } from "react-icons/io5";

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
            <Link
              key={idx}
              href={routemap.route}
              target={routemap.inNewTab ? "_blank" : ""}
            >
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
            <TooltipComponent tooltipText="Support">
              <div className="bg-white p-4 rounded-full flex items-center justify-center">
                <MdOutlineMailOutline className="text-3xl text-black" />
              </div>
            </TooltipComponent>
          </Link>
          <Link
            href="https://www.instagram.com/crafterswealth/profilecard/?igsh=OHVyaWU1Yzllam9s"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TooltipComponent tooltipText="@CraftersWealth">
              <div className="bg-white p-4 rounded-full flex items-center justify-center">
                <FaInstagram className="text-3xl text-black" />
              </div>
            </TooltipComponent>
          </Link>
          <Link
            href="https://api.whatsapp.com/send/?phone=917204159510&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TooltipComponent tooltipText="Priority support via WhatsApp">
              <div className="bg-white p-4 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-3xl text-black" />
              </div>
            </TooltipComponent>
          </Link>
          <Link
            href="mailto:compalints@crafterswealth.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TooltipComponent tooltipText="Complaints">
              <div className="bg-white p-4 rounded-full flex items-center justify-center">
                <IoWarningOutline className="text-3xl text-black" />
              </div>
            </TooltipComponent>
          </Link>
        </div>
        <div className="text-sm md:text-base italic flex flex-col gap-4 justify-center max-w-screen-xl text-center">
          <p className="relative text-sm inline-block before:content-['“'] after:content-['”'] before:text-2xl after:text-2xl before:relative after:relative before:top-1 after:top-1">
            &nbsp;Investment in securities market is subject to market risks.
            Read all the related documents carefully before investing.
          </p>
          <p className="relative text-sm inline-block before:content-['“'] after:content-['”'] before:text-2xl after:text-2xl before:relative after:relative before:top-1 after:top-1">
            &nbsp;Registration granted by SEBI and certification from NISM in no
            way, guarantees the performance of the intermediary or provides any
            assurance of returns to investors.
          </p>
        </div>

        <h1 className="text-lg font-semibold">
          CRAFTERS FINANCIAL RESEARCH PRIVATE LIMITED (Research Analyst) | SEBI
          Regn., No. INH000016117
        </h1>
        <p>
          Copyright &copy; {new Date().getFullYear()} CraftersWealth
          <sup>™</sup>
        </p>
      </section>
      <section className="bg-black text-primary flex justify-center items-center gap-2 p-4 text-sm">
        {BOTTOM_FOOTER_ROUTES.map((routemap, idx) => (
          <React.Fragment key={idx}>
            <Link href={routemap.route} className="hover:underline">
              {routemap.name}
            </Link>
            {idx < BOTTOM_FOOTER_ROUTES.length - 1 && <span>|</span>}
          </React.Fragment>
        ))}
      </section>
    </>
  );
};

export default Footer;
