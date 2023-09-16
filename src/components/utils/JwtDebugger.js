import {
  decodeProtectedHeader,
  decodeJwt,
  jwtVerify,
  SignJWT,
  generateKeyPair,
  importPKCS8,
  importSPKI,
} from "jose";

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

// returns the header
export const getHeader = (header, indent = 2) =>
  JSON.stringify(decodeProtectedHeader(header), null, indent);

// returns the formatted payload json
export const getPayload = (data, indent = 2) =>
  JSON.stringify(decodeJwt(data), null, indent);

// validates the signature
export const validateSignature = async (jwtToken, algorithm, key, pubKey) => {
  try {
    if (algorithm.toLowerCase().startsWith("h")) {
      const privateKey = new TextEncoder().encode(key);
      await jwtVerify(jwtToken, privateKey);
      return true;
    } else {
      if (!key || pubKey) return false;
      const publicKey = await importSPKI(pubKey, algorithm);
      await jwtVerify(jwtToken, publicKey);
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const signToken = async (data, algorithm, privateKey, publicKey) => {
  try {
    if (algorithm.toLowerCase().startsWith("h")) {
      const key = new TextEncoder().encode(privateKey ? privateKey : " ");
      return new SignJWT(JSON.parse(data))
        .setProtectedHeader({
          alg: algorithm,
          typ: "JWT",
        })
        .sign(key);
    } else {
      let { pubKey, privKey } = await generateKeyPair(algorithm, {
        extractable: true,
      });

      // privKey = await importPKCS8(privateKey ? privateKey : "", algorithm);
      // pubKey = await importPKCS8(publicKey ? publicKey : "", algorithm);
      return new SignJWT(JSON.parse(data))
        .setProtectedHeader({
          alg: algorithm,
          typ: "JWT",
        })
        .sign(privKey);
    }
  } catch (error) {
    console.log(error);
  }
};
