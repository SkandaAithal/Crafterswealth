import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { LOGIN_PAGE, PROTECTED_ROUTES } from "../routes";
import PageLoader from "@/components/ui/page-loader";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAuth } from "./auth-provider";
import { toast } from "../hooks/use-toast";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { isAuthLoading, redirectTrigger } = useAuth();
  const { data: session } = useSession();
  const isProtected = pathName
    ? PROTECTED_ROUTES.some((protectedRoute) =>
        pathName.startsWith(protectedRoute)
      )
    : false;

  const handleSessionRedirect = async (showToast = false) => {
    const sess = await getSession();
    if (!sess && isProtected) {
      const loginUrl = `${LOGIN_PAGE}?redirect=${encodeURIComponent(pathName)}`;
      router.push(loginUrl);
      if (showToast) {
        toast({
          title: "Your session has timed out",
          description: "Please log in again to access this page",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    handleSessionRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isProtected, pathName]);

  useEffect(() => {
    handleSessionRedirect(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectTrigger]);

  if (isAuthLoading) {
    return <PageLoader />;
  }

  if (session) {
    return children;
  }

  if (!isProtected) {
    return children;
  }

  return <PageLoader />;
};

export default ProtectedRoute;
