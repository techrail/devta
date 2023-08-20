import { decodeProtectedHeader, decodeJwt } from "jose";

export const getHeader = (header, indent = 2) =>
  JSON.stringify(decodeProtectedHeader(header), null, indent);

export const getPayload = (data, indent = 2) =>
  JSON.stringify(decodeJwt(data), null, indent);
