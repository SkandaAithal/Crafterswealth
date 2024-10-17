import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Button } from "../ui/button";
import { BiLogIn } from "react-icons/bi";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { HEADER_ROUTES } from "@/lib/constants";
import { HOME, LOGIN_PAGE } from "@/lib/routes";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { MdKeyboardArrowDown } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import ModalDrawer from "./ModalDrawer";
import { AuthActionTypes, SessionObject } from "@/lib/types/common/user";
import UserProfile from "./UserProfile";
import LazyImage from "../ui/lazy-image";
import { useAuth } from "@/lib/provider/auth-provider";
import { TbLoader3 } from "react-icons/tb";

const Header = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data, status } = useSession();
  const session = data as SessionObject;
  const { user, isAuthLoading, authDispatch } = useAuth();
  const isLoading = status === "loading" || isAuthLoading;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    authDispatch({ type: AuthActionTypes.CLEAR_USER_DETAILS });
    router.push(LOGIN_PAGE);
    setIsLoggingOut(false);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const renderRoutes = (isMobile = false) => {
    return HEADER_ROUTES.map((routeMap) => {
      const isRouteActive =
        routeMap.route === HOME
          ? router.pathname === routeMap.route
          : routeMap.subroutes
            ? routeMap.subroutes.some(
                (subroute) => router.pathname === subroute.route
              )
            : router.pathname === routeMap.route;

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
            <HoverCard
              openDelay={20}
              onOpenChange={(open) => setIsHovered(open)}
            >
              <HoverCardTrigger asChild>
                <Button
                  variant="transparent"
                  className={twMerge(
                    "font-semibold flex items-center gap-1",
                    activeClassName
                  )}
                >
                  {routeMap.name}
                  <MdKeyboardArrowDown
                    className={`transform  translate-y-0.5 transition-transform duration-300 ${
                      isHovered ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="p-1 w-52">
                <div>
                  {routeMap.subroutes.map((subroute) => (
                    <div
                      key={subroute.name}
                      className="p-2 rounded-md hover:bg-accent text-base"
                    >
                      <Link
                        href={subroute.route}
                        className="flex justify-between cursor-pointer w-full"
                      >
                        <>
                          <p>{subroute.name}</p>
                          <subroute.icon size={24} />
                        </>
                      </Link>
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        );
      }

      return (
        <div
          key={routeMap.name}
          className={twMerge(
            "relative font-semibold transition-all duration-200 text-center w-fit",
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
          className="w-40 md:w-52"
        />
        <p className="text-sm md:text-lg">We Analyse, You Profit!</p>
      </>
    </Link>
  );

  const renderAvatar = () => {
    return (
      <div className="md:min-w-[100px]">
        {isLoading ? (
          <TbLoader3 size={40} className="animate-spin mx-auto" />
        ) : session && user ? (
          <div onClick={() => setIsProfileOpen(true)}>
            {session?.user?.image ? (
              <div className="h-[50px] w-[50px] md:h-16 md:w-16 text-xl mx-auto grid place-content-center overflow-hidden text-center rounded-full cursor-pointer text-primary skeleton-loader">
                <LazyImage
                  src={session.user.image}
                  alt="User Avatar"
                  height={150}
                  width={150}
                  className="h-[50px] w-[50px] md:h-16 md:w-16 object-cover"
                />
              </div>
            ) : (
              <div className="h-[50px] w-[50px] md:h-16 md:w-16 text-xl mx-auto grid place-content-center overflow-hidden text-center rounded-full cursor-pointer text-primary bg-primary-blue-80">
                <p>{getInitials(`${user.firstName} ${user.lastName}`)}</p>
              </div>
            )}
          </div>
        ) : (
          <Button
            className="!flex items-center justify-center gap-2 !py-2 !pr-5"
            onClick={() => router.push(LOGIN_PAGE)}
          >
            <BiLogIn size={24} /> <p className="hidden md:block">Login</p>
          </Button>
        )}
      </div>
    );
  };

  return (
    <header
      id="header"
      className="bg-background shadow-md md:pt-6 md:px-8 p-4 mx-auto flex justify-between items-center sticky top-0 w-full z-[50] lg:h-[100px]"
    >
      {renderLogo()}
      <nav className="hidden lg:flex items-center space-x-8">
        {renderRoutes()}
        {renderAvatar()}
      </nav>

      <section className="lg:hidden flex justify-center items-center gap-4">
        {renderAvatar()}

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
      <ModalDrawer
        isModalOpen={isProfileOpen}
        showModal={setIsProfileOpen}
        modalTitle="Your profile"
        closeBtnText="Logout"
        modalDescription="View your purchases and account details. Logout anytime."
        customModalElement={<UserProfile />}
        dialogFooterClassName="w-60"
        handleCloseModalAction={handleLogout}
        isCloseBtnLoading={isLoggingOut}
      />
    </header>
  );
};

export default Header;
