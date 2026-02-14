import { headers } from "next/headers";
import { userAgent } from "next/server";

export async function isMobile() {
  const headersList = await headers();

  try {
    const { device } = userAgent({ headers: headersList });
    return device.type === "mobile" || device.type === "tablet";
  } catch {
    const ua = headersList.get("user-agent") || "";
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  }
}
