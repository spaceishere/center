import { userAgent } from "next/server";

export async function GET(request: Request) {
  let isIos = false;

  const userAgentObject = userAgent(request);

  if (
    userAgentObject.os.name === "IOS" ||
    userAgentObject.os.name === "Mac OS"
  ) {
    isIos = true;
  }

  return Response.json({ ios: isIos }, { status: 200 });
}
