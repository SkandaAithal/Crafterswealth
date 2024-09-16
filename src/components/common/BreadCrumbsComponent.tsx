import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbsProps } from "@/lib/types/breadcrumbs";

const BreadCrumbsComponent: React.FC<BreadcrumbsProps> = ({ routes }) => {
  const router = useRouter();

  return (
    <Breadcrumb aria-label="breadcrumb" className="layout !pt-6">
      <BreadcrumbList>
        {routes.map((item, index) => {
          const isActive = router.pathname === item.href;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isActive ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <Link href={item.href} passHref>
                    {item.label}
                  </Link>
                )}
              </BreadcrumbItem>
              {index < routes.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbsComponent;
