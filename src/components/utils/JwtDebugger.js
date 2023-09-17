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
export const validateSignature = async (jwtToken, algorithm, key, pubKey) => {
  try {
    if (algorithm.toLowerCase().startsWith("h")) {
      const privateKey = new TextEncoder().encode(key ? key : " ");
      await jwtVerify(jwtToken, privateKey);
      return true;
    } else {
      if (!key || !pubKey) return false;
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
      let keys = await generateKeyPair(algorithm, {
        extractable: true,
      });
      if (privateKey && privateKey !== " ") {
        keys.privateKey = await importPKCS8(privateKey, algorithm);
      }
      if (publicKey && publicKey !== " ") {
        keys.publicKey = await importPKCS8(publicKey, algorithm);
      }
      // Create a JWT object
      const jwt = new SignJWT(JSON.parse(data)).setProtectedHeader({
        typ: "JWT",
        alg: algorithm,
      });
      // Sign the JWT using the private key
      const token = await jwt.sign(keys.privateKey);

      // Export the private and public keys
      const privateKeyExported = await exportPKCS8(keys.privateKey);
      const publicKeyExported = await exportSPKI(keys.publicKey);

      // Return the token and keys
      return {
        token,
        privateKey: privateKeyExported,
        publicKey: publicKeyExported,
      };

      // let { pubKey, privKey } = await generateKeyPair(algorithm, {
      //   extractable: true,
      // });
      // if (publicKey !== "" || publicKey) {
      //   pubKey = await importPKCS8(publicKey, algorithm);
      // }

      // if (privateKey !== "" || publicKey) {
      //   privKey = await importPKCS8(privateKey, algorithm);
      // }
      // const jwt = new SignJWT(JSON.parse(data)).setProtectedHeader({
      //   typ: "JWT",
      //   alg: algorithm,
      // });
      // token = await jwt.sign(privKey);
      // privateKey = await exportPKCS8(privKey);
      // publicKey = await exportSPKI(pubKey);
      // return { token, privateKey, publicKey };

      // let { pubKey, privKey } = await generateKeyPair(algorithm, {
      //   extractable: true,
      // });

      // // privKey = await importPKCS8(privateKey ? privateKey : "", algorithm);
      // // pubKey = await importPKCS8(publicKey ? publicKey : "", algorithm);
      // return new SignJWT(JSON.parse(data))
      //   .setProtectedHeader({
      //     alg: algorithm,
      //     typ: "JWT",
      //   })
      //   .sign(privKey);
    }
  } catch (error) {
    console.log(error);
  }
};
