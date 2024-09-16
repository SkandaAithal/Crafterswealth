import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { HEADER_ROUTES } from "@/lib/constants";
import { HOME } from "@/lib/routes";

const Header = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const renderRoutes = (isMobile = false) => {
    return HEADER_ROUTES.map((routeMap) => {
      const isRouteActive =
        routeMap.route === HOME
          ? router.pathname === routeMap.route
          : routeMap.subroutes
            ? routeMap.subroutes.some((subroute) =>
                router.pathname.startsWith(subroute.route)
              )
            : router.pathname.startsWith(routeMap.route);

      const activeClassName = isRouteActive ? "!text-primary-blue" : "";

      if (routeMap.subroutes) {
        if (isMobile) {
          return (
            <AccordionItem key={routeMap.name} value={routeMap.name}>
              <AccordionTrigger
                className={twMerge("font-semibold py-0", activeClassName)}
              >
                {routeMap.name}
              </AccordionTrigger>
              <AccordionContent className="grid gap-1 p-0 mt-1">
                {routeMap.subroutes.map((subroute) => (
                  <Link
                    key={subroute.name}
                    href={subroute.route}
                    onClick={closeSheet}
                    className="flex justify-between cursor-pointer w-full p-2 hover:bg-accent rounded-md"
                  >
                    <>
                      <p>{subroute.name}</p>
                      <subroute.icon size={24} />
                    </>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        }

        return (
          <div key={routeMap.name} className="relative">
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="transparent"
                  className={twMerge("font-semibold", activeClassName)}
                >
                  {routeMap.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 w-52">
                {routeMap.subroutes.map((subroute) => (
                  <DropdownMenuItem key={subroute.name}>
                    <Link
                      href={subroute.route}
                      onClick={closeDropdown}
                      className="flex justify-between cursor-pointer w-full"
                    >
                      <>
                        <p>{subroute.name}</p>
                        <subroute.icon size={24} />
                      </>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }

      return (
        <div
          key={routeMap.name}
          className={twMerge(
            "relative font-semibold transition-all duration-200",
            activeClassName
          )}
        >
          <Link
            href={routeMap.route}
            onClick={closeSheet}
            className="w-full inline-block"
          >
            {routeMap.name}
          </Link>
        </div>
      );
    });
  };

  const renderLogo = () => (
    <Link href={HOME}>
      <>
        <Image
          src="/crafterswealth-logo.png"
          alt="logo"
          width={200}
          height={27}
        />
        <p className="text-base md:text-lg">We Analyse, You Profit!</p>
      </>
    </Link>
  );

  return (
    <header
      id="header"
      className="bg-background shadow-md md:pt-6 md:px-8 p-4 max-w-screen-2xl mx-auto flex justify-between items-center sticky top-0 w-full z-[20]"
    >
      {renderLogo()}
      <nav className="hidden md:flex space-x-6">{renderRoutes()}</nav>

      <section className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="transparent"
              onClick={() => setIsSheetOpen(true)}
            >
              <HiOutlineMenuAlt3 size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-4">
            <SheetTitle className="pb-4"> {renderLogo()}</SheetTitle>
            <Accordion type="single" collapsible className="grid gap-2">
              {renderRoutes(true)}
            </Accordion>
          </SheetContent>
        </Sheet>
      </section>
    </header>
  );
};

export default Header;
