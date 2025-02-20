import { notFound } from "next/navigation";

import { getUserServiceHistory } from "@/features/profile/api/getUserServiceHistory";

import { getMetadata } from "@/lib/metadata";
import { UserServicesHistoryContent } from "@/features/profile/components/user-services-history-content";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export async function generateMetadata() {
  return await getMetadata("Цаг захиалгийн түүх");
}

const ServiceHistoryPage = async () => {
  const { user, activeServices, historyServices } =
    await getUserServiceHistory();

  if (!user) notFound();

  return (
    <div className="rounded-[16px] border border-gray-200 p-4">
      <UserServicesHistoryContent
        activeServices={activeServices}
        historyServices={historyServices}
      />
    </div>
  );
};

export default ServiceHistoryPage;
