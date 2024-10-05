import React from "react";
import Title from "./Title";
import Scroller from "./Scroller";
import { ICONS } from "@/lib/constants";
import Image from "next/image";

const AuthBanner = () => {
  return (
    <section className="bg-auth-banner-image bg-center bg-cover lg:h-full w-full grid place-content-center text-primary lg:rounded-b-none  rounded-b-[35px] shadow-xl h-44 md:h-60">
      <div className="px-10 text-center lg:text-left">
        <Title
          noAnimate
          text="Welcome to"
          className="text-primary text-xl !mb-2"
          size="H2"
        />
        <Title
          noAnimate
          text="CraftersWealth"
          className="text-primary text-[28px] !mb-1"
        />
        <div className="max-w-[450px] grid w-full  md:!mt-8">
          <Scroller>
            {ICONS.map((icon, idx) => (
              <div
                key={idx}
                className="mx-6 rounded-full bg-[#0b0a32] py-2 px-3 text-center"
              >
                <Image src={icon} alt="icons" height={30} width={30} />
              </div>
            ))}
          </Scroller>
        </div>
      </div>
    </section>
  );
};

export default AuthBanner;
