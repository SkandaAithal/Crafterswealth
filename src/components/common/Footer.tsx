import { FOOTER_ROUTES } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import Title from "./Title";
import { FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { PAGES_TO_HIDE_FOOTER } from "@/lib/routes";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();

  if (PAGES_TO_HIDE_FOOTER.includes(pathName)) return <></>;

  return (
    <section className="text-center grid place-content-center gap-4 py-10 px-4 bg-gradient-to-b from-primary-blue-80 to-primary-blue-100 text-primary">
      <Title text="CraftersWealth" className="text-primary" size="H2" />
      <div className="flex justify-center gap-8 flex-wrap">
        {FOOTER_ROUTES.map((routemap, idx) => (
          <Link key={idx} href={routemap.route}>
            {routemap.name}
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-10">
        <div className="bg-white p-4 rounded-full flex items-center justify-center">
          <FaInstagram className="text-3xl text-black" />
        </div>
        <div className="bg-white p-4 rounded-full flex items-center justify-center">
          <FaWhatsapp className="text-3xl text-black" />
        </div>
        <div className="bg-white p-4 rounded-full flex items-center justify-center">
          <FaXTwitter className="text-3xl text-black" />
        </div>
      </div>

      <h1 className="text-base">
        CRAFTERS FINANCIAL RESEARCH PRIVATE LIMITED (Research Analyst) | SEBI
        Regn., No. INH000016117
      </h1>
      <p>Copyright &copy; {new Date().getFullYear()} CraftersWealth</p>
    </section>
  );
};

export default Footer;
