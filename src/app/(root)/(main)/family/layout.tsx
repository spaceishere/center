import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { FamilyHeaderNavigation } from "@/features/family/components/family-header-navigation";

export async function generateMetadata() {
  return await getMetadata("Ногоон гэр бүл");
}

interface GreenFamilyLayoutProps {
  children: React.ReactNode;
}

const GreenFamilyLayout = ({ children }: GreenFamilyLayoutProps) => {
  return (
    <Container className="flex-1 space-y-8 pt-[30px]">
      <FamilyHeaderNavigation />

      {children}
    </Container>
  );
};

export default GreenFamilyLayout;
