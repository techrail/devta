export const beautifyJSON = (jsonString, indent = 2) => {
  try {
    const jsonObject = JSON.parse(jsonString);
    return JSON.stringify(jsonObject, null, indent); // 2 spaces for indentation
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};
