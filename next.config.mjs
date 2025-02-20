/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**.erxes.io",
      },
      {
        protocol: "https",
        hostname: "erxes.io",
      },
      {
        protocol: "https",
        hostname: "erxes.priuscenter.mn",
      },
      {
        protocol: "https",
        hostname: "test-erxes-app.priuscenter.mn",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
      {
        protocol: "https",
        hostname: "plugin-core-api",
      },
      {
        protocol: "http",
        hostname: "plugin-core-api",
      },
    ],
  },
  env: {
    ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6IldlYiBsYXRlc3QiLCJjcmVhdGVkQXQiOiIyMDI1LTAyLTA2VDA4OjI1OjQ1LjA2NFoiLCJ1c2VyR3JvdXBJZCI6IkNGRE5qcTVyaDZMNURSQjJQIiwiZXhwaXJlRGF0ZSI6IjIwMjUtMDMtMDhUMDg6MjY6MDcuMjMzWiIsIm5vRXhwaXJlIjp0cnVlLCJhbGxvd0FsbFBlcm1pc3Npb24iOnRydWUsIl9pZCI6ImVWRThFMUdEaEtzWUx0dEdXYU1hRCIsIl9fdiI6MH0sImlhdCI6MTczODgzMDM3OX0.VX6g8oG-ySvqK12sqwh93pGWv0NHv4Rhp7zRR8hmSC8",
    ERXES_API_URL: "https://erxes.priuscenter.mn/gateway",
    WSS_ERXES_API_URL: "wss://erxes.priuscenter.mn/gateway/graphql",
    NEXT_PUBLIC_POS_TOKEN: "E83kdyse7xRGkZ3aJleptCUM6iWI6YPu",
    CLIENT_PORTAL_ID: "xryzQPG8hLWcj7qj9",
    NEXT_PUBLIC_GOOGLE_ID:
      "561378914128-14toldgkue5v5o9dq6jlakku5tglqndv.apps.googleusercontent.com",
    NEXT_PUBLIC_FACEBOOK_ID: "477832793072863",
    KB_BANNERS: "w87FmY9igaQe96u5a",
  },
};

export default nextConfig;
