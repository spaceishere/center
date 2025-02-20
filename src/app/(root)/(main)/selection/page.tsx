import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { Sidebar } from "@/features/selection/components/sidebar";
import { Content } from "@/features/selection/components/content";

export async function generateMetadata() {
  return await getMetadata("Сонгон шалгаруулалт");
}

const SelectionPage = () => {
  return (
    <Container className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-5 lg:grid-cols-3 lg:px-11 xl:grid-cols-4">
      <Content />

      <Sidebar />
    </Container>
  );
};

export default SelectionPage;
