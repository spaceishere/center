import "./globals.css";
import { Metadata } from "next/types";
import { Roboto } from "next/font/google";

import { cn } from "@/lib/utils";
import { getConfig } from "@/lib/actions";

import { Providers } from "@/providers";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const revalidate = 300;

// export async function generateMetadata(): Promise<Metadata> {
//   const { config } = await getConfig();
//   const { pdomain } = config || {};

//   const description =
//     "Хаврын техник үйлчилгээний хөтөлбөр эхэллээ. Урин дулаан цаг ойртсон энэ үед автомашиндаа тулгардаг асуудлуудыг 1 багцаар шийдээд гарын бэлэг аваарай.";

//   return {
//     metadataBase: new URL(pdomain || "https://www.erxes.io"),
//     title: { template: "%s | Приус центр", default: "Приус центр" },
//     description,

//     openGraph: {
//       title: "Приус центр",
//       description,
//       url: "https://priuscenter.mn",
//       type: "website",
//       siteName: "Приус центр",
//       locale: "mn_MN",
//       images: [
//         { url: "/assets/og-pre-1.jpg", width: 800, height: 800 },
//         { url: "/assets/og-pre-2.jpg", width: 800, height: 800 },
//       ],
//     },
//     alternates: {
//       canonical: "/",
//       languages: {
//         "mn-MN": "mn-MN",
//         "en-US": "/en-US",
//       },
//     },
//     robots: {
//       index: true,
//       follow: true,
//       nocache: true,
//       googleBot: {
//         index: true,
//         follow: false,
//         noimageindex: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//     generator: "Приус центр",
//     applicationName: "Приус центр",
//     referrer: "origin-when-cross-origin",
//     keywords: ["prius center", "priuscenter", "prius", "Приус центр", "Приус"],
//     authors: [
//       {
//         name: "Приус центр",
//         url: "https://www.facebook.com/priuscenter.mn",
//       },
//     ],
//   };
// }

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />

        <Script
          id="GTM-T964VF2"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T964VF2');`,
          }}
        />
      </head>
      <body className={cn("h-[100dvh] w-full antialiased", roboto.className)}>
        <Providers>{children}</Providers>
        <noscript>
          <iframe
            name="googletagmanager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-T964VF2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
