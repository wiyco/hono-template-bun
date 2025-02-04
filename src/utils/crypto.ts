import crypto from "node:crypto";

export async function generateHMAC(
  payload: string,
  key: string,
): Promise<string> {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(payload);
  return hmac.digest("hex");
}
