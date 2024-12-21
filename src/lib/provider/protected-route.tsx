import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { LOGIN_PAGE, PROTECTED_ROUTES } from "../routes";
import PageLoader from "@/components/ui/page-loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAuth } from "./auth-provider";
import { toast } from "../hooks/use-toast";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { isAuthLoading, redirectTrigger, isAuthenticated } = useAuth();
  const { status } = useSession();
  const isProtected = pathName
    ? PROTECTED_ROUTES.some((protectedRoute) =>
        pathName?.startsWith(protectedRoute)
      )
    : false;

  const handleSessionRedirect = async (showToast = false) => {
    if (!isAuthenticated() && isProtected) {
      const loginUrl = `${LOGIN_PAGE}?redirect=${encodeURIComponent(pathName)}`;
      router.push(loginUrl);
      if (showToast) {
        toast({
          title: "Your session has timed out",
          description: "Please login again!",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    handleSessionRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isProtected, pathName]);

  useEffect(() => {
    handleSessionRedirect(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectTrigger]);

  if (!isProtected) {
    return children;
  }

  if (isAuthLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated()) {
    return children;
  }

  return <PageLoader />;
};

export default ProtectedRoute;
