import crypto from "crypto";

export function liqpaySign(dataB64: string, privateKey: string) {
  return crypto
    .createHash("sha1")
    .update(privateKey + dataB64 + privateKey)
    .digest("base64");
}