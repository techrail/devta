import Module from "../index.mjs";
import CryptoJS from "crypto-js";

export default class HashGenerator extends Module {
  static info() {
    return {
      name: "Hash Generator",
      slug: "hash_generator",
      input: {
        type: "textarea",
        placeholder: "Enter content to hash...",
        default: "Hello World",
      },
      icon: "tag",
      // image: "img path relative to public"
    };
  }

  static process(input) {
    const op = [];

    const supportedHashAlgoList = {
      MD5: CryptoJS.MD5,
      SHA1: CryptoJS.SHA1,
      SHA3: CryptoJS.SHA3,
      SHA224: CryptoJS.SHA224,
      SHA256: CryptoJS.SHA256,
      SHA384: CryptoJS.SHA384,
      SHA512: CryptoJS.SHA512,
    };

    Object.keys(supportedHashAlgoList).forEach((e) => {
      op.push({
        label: e,
        value: supportedHashAlgoList[e](input).toString(),
        type: "text", // only text and image are to be supported
      });
    });

    return {
      1: "$input", // input will be placed inside grid
      2: op,
    };
  }
}
