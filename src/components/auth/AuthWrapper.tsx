import { useAuth } from "@/lib/provider/auth-provider";
import React, { ReactNode } from "react";
import PageLoader from "../ui/page-loader";

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <PageLoader />;

  return <>{children}</>;
};

export default AuthWrapper;
