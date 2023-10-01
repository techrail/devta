import jsonToPrettyYaml from "json-to-pretty-yaml";
import { beautifyJSON } from "./jsonBeautifier";
import { parse } from "js2xmlparser";

export const converterOptions = ["yaml", "xml", "csv"];

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

export const formatCSV = (inputJson) => {
  const json = JSON.parse(inputJson);
  try {
    let input = []
    if (!Array.isArray(json)){
      input.push(json)
    }
    else{
      input = json
    }
    const flattenedObject = flattenObject(input[0]);
    const keys = Object.keys(flattenedObject);
    const csvHeader = keys.join(",");
    const csvRows = [];
    input.forEach(obj => {
      const flattenedObj = flattenObject(obj);
      const values = keys.map(key => flattenedObj[key]);
      csvRows.push(values.join(","));
    });
    return `${csvHeader}\n${csvRows.join("\n")}`;
  } catch (error) {
    console.log(error)
  }
};

export const jsonValidator = (inputJson) => {
  try {
    JSON.stringify(JSON.parse(inputJson));
    return true;
  } catch (error) {
    return false;
  }
};

const flattenObject = (obj, parentKey = "") => {
  let result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}/${key}` : key;
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        let nestedObj = flattenObject(obj[key], newKey);
        result = { ...result, ...nestedObj };
      }
      else if(Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          result[`${newKey}/${index}`] = item;
        });
      }
      else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}