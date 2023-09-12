import { decodeProtectedHeader, decodeJwt, jwtVerify } from "jose";

export const algorithms = [
  "HS256", // default arg
  "HS384",
  "HS512",
  "PS256",
  "PS384",
  "PS512",
  "RS256",
  "RS384",
  "RS512",
  "ES256",
  "ES384",
  "ES512",
];

export const getHeader = (header, indent = 2) =>
  JSON.stringify(decodeProtectedHeader(header), null, indent);

export const getPayload = (data, indent = 2) =>
  JSON.stringify(decodeJwt(data), null, indent);

export const validateSignature = async (jwtToken, algorithm, key) => {
  try {
    if (algorithm[0].toLowercase() == "h") {
      const key = new TextEncoder().encode(key);
      const res = await jwtVerify(jwtToken, key);
      console.log(res);
    }
  } catch (error) {
    return false;
  }
};
