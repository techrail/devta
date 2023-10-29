export const sampleInput = "Hello from Devta"
export const ifNull = (userInput) => {
  if (userInput == null) {
      return true;
  }
  else {
      return false;
  }
}
export const unescapeSpecialCharacters = (inputString) => {
    return inputString
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, '\'') 
      .replace(/\\\\/g, '\\');
}

export const escapeSpecialCharacters = (inputString) => {
    return inputString
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'");
  }