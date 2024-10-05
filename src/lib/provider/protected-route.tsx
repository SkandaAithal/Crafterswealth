import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { LOGIN_PAGE, PROTECTED_ROUTES } from "../routes";
import PageLoader from "@/components/ui/page-loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const isProtected = pathName
    ? PROTECTED_ROUTES.some((protectedRoute) =>
        pathName.startsWith(protectedRoute)
      )
    : false;

  useEffect(() => {
    if (!session && isProtected) {
      const loginUrl = `${LOGIN_PAGE}?redirect=${encodeURIComponent(pathName)}`;
      router.push(loginUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isProtected, pathName]);

  if (session) {
    return children;
  }

  if (!isProtected) {
    return children;
  }

  return <PageLoader />;
};

export default ProtectedRoute;
