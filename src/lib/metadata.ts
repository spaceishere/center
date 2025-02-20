import { Metadata } from "next";
import getConfig from "next/config";

export const getMetadata = async (title?: string): Promise<Metadata> => {
  const { config } = await getConfig();
  const { pdomain } = config || {};

  const description =
    "Хаврын техник үйлчилгээний хөтөлбөр эхэллээ. Урин дулаан цаг ойртсон энэ үед автомашиндаа тулгардаг асуудлуудыг 1 багцаар шийдээд гарын бэлэг аваарай.";

  return {
    metadataBase: new URL(pdomain || "https://www.erxes.io"),
    title: title ?? "",
    description,
    openGraph: {
      title: `Приус Центр ${title?.toLowerCase() ?? ""}`,
      description,
      images: [
        {
          url: "/favicon.png",
          width: 600,
          height: 600,
          alt: "Logo",
        },
      ],
      url: pdomain,
      type: "website",
    },
  };
};
