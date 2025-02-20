"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import branches from "@/gql/branch/queries";
import { useQuery } from "@apollo/client";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  const { data } = useQuery(branches, {
    variables: {
      withoutUserFilter: true,
    },
  });

  return (
    <div className="h-full w-full pt-[140px]">
      <Navbar branches={data?.branches} />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
