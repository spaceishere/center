import { redirect } from "next/navigation";

import { Container } from "@/components/container";
import { ProfileNavigation } from "@/features/profile/components/profile-navigation";
import { ProfileUserDetail } from "@/features/profile/components/profile-user-detail";
import { getScore } from "@/features/profile/api/getScore";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = async ({ children }: ProfileLayoutProps) => {
  const { user, score } = await getScore();

  const header = headers();
  const isPrimart = header.get("x-url")?.includes("/primart");

  if (!user) {
    redirect("/");
  }

  return (
    <Container
      className={cn(
        "order-1 mx-auto grid w-full grid-flow-row-dense gap-x-[30px] gap-y-6 md:order-none md:grid-cols-2 lg:grid-cols-7 xl:grid-cols-4 2xl:grid-cols-5",
        isPrimart && "lg:grid-cols-2",
      )}
    >
      <div
        className={cn(
          "col-span-1 lg:col-span-2 xl:col-span-1",
          isPrimart && "lg:col-span-1",
        )}
      >
        <ProfileNavigation />
      </div>

      <div
        className={cn(
          "order-3 col-span-1 w-full flex-1 md:order-none md:col-span-2 lg:col-span-3 xl:col-span-2 2xl:col-span-3",
          isPrimart && "lg:col-span-2",
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          "order-2 col-span-1 min-h-[300px] md:order-none lg:col-span-2 xl:col-span-1",
          isPrimart && "lg:col-span-1",
        )}
      >
        <ProfileUserDetail user={user} totalScore={score} />
      </div>
    </Container>
  );
};

export default ProfileLayout;
