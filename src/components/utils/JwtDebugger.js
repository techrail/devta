import { decodeProtectedHeader, decodeJwt, jwtVerify, SignJWT } from "jose";

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
    if (algorithm.toLowerCase().startsWith("h")) {
      const privateKey = new TextEncoder().encode(key);
      await jwtVerify(jwtToken, privateKey);
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const signToken = async (data, algorithm, privateKey, headers) => {
  try {
    if (algorithm.toLowerCase().startsWith("h")) {
      const key = new TextEncoder().encode(privateKey ? privateKey : " ");
      return new SignJWT(JSON.parse(data))
        .setProtectedHeader(JSON.parse(headers))
        .sign(key);
    }
  } catch (error) {
    console.log(error);
  }
};
