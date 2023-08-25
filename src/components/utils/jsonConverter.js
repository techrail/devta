import jsonToPrettyYaml from "json-to-pretty-yaml";
import { beautifyJSON } from "./jsonBeautifier";
import { parse } from "js2xmlparser";

export const converterOptions = ["yaml", "xml"];

export const input = {
  id: 12345,
  first_name: "John",
  last_name: "Doe",
  age: 30,
  email: "john.doe@example.com",
  address: {
    street: "123 Main Street",
    city: "Anytown",
    state: "CA",
    postal_code: "12345",
  },
};

export const sampleJson = beautifyJSON(JSON.stringify(input));

export const formatYAML = (inputJson) => {
  try {
    const formattedVal = jsonToPrettyYaml.stringify(JSON.parse(inputJson));
    return formattedVal;
  } catch (error) {
    console.log(error);
  }
};

export const formatXML = (inputJson) => {
  const json = JSON.parse(inputJson);
  try {
    const xmlOutput = parse("converted-xml", json);
    return xmlOutput;
  } catch (error) {
    console.log(error);
  }
};
