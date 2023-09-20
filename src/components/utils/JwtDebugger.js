import {
  decodeProtectedHeader,
  decodeJwt,
  jwtVerify,
  SignJWT,
  generateKeyPair,
  importPKCS8,
  importSPKI,
  exportPKCS8,
  exportSPKI,
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
export const validateSignature = async (jwtToken, algorithm, store) => {
  try {
    if (algorithm.toLowerCase().startsWith("h")) {
      const privateKey = new TextEncoder().encode(
        store.privateKey ? store.privateKey : " "
      );
      await jwtVerify(jwtToken, privateKey);
      return true;
    } else {
      if (!store.privateKey || !store.publicKey) return false;
      const publicKey = await importSPKI(store.publicKey, algorithm);
      await jwtVerify(jwtToken, publicKey);
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const signToken = async (data, algorithm, store) => {
  try {
    if (algorithm.toLowerCase().startsWith("h")) {
      const key = new TextEncoder().encode(
        store.privateKey ? store.privateKey : " "
      );
      return new SignJWT(JSON.parse(data))
        .setProtectedHeader({
          alg: algorithm,
          typ: "JWT",
        })
        .sign(key);
    } else {
      let keys = await generateKeyPair(algorithm, {
        extractable: true,
      });
      if (store.privateKey && store.privateKey !== " ") {
        keys.privateKey = await importPKCS8(store.privateKey, algorithm, {
          extractable: true,
        });
      }
      if (store.publicKey && store.privateKey !== " ") {
        keys.publicKey = await importSPKI(store.publicKey, algorithm, {
          extractable: true,
        });
      }
      console.log("keys->", keys);
      // Create a JWT object
      const jwt = new SignJWT(JSON.parse(data)).setProtectedHeader({
        typ: "JWT",
        alg: algorithm,
      });
      // Sign the JWT using the private key
      const token = await jwt.sign(keys.privateKey);
      console.log("token->", token);
      // Export the private and public keys
      const privateKeyExported = await exportPKCS8(keys.privateKey);
      const publicKeyExported = await exportSPKI(keys.publicKey);

      // Return the token and keys
      return {
        token,
        privateKey: privateKeyExported,
        publicKey: publicKeyExported,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
