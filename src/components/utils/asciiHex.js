export const sampleInput = "Hello from Devta"
export const asciiToHex = (userInput) => {
  try { 
    let hex = '';
    let tempAscii, Hex;
    userInput.split('').map( i => {
      tempAscii = i.charCodeAt(0)
      Hex = tempAscii.toString(16);
      hex = hex + Hex + ' ';
    });
    hex = hex.trim()
    return hex;
  } catch (error) {
    console.log(error);
  }
}
export const hexValidator = (userInput) => {
  try {
    if (userInput != null) {
      const hexWords = userInput.replace(/\s+/g, '')
      const regex = /^[0-9a-f]+$/gm;
      if (hexWords.match(regex) ){
        return true
      } else{
        return false
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export const hexToAscii = (userInput) => {
  try {
    const hexValues = userInput.split(' ');
    const asciiString = hexValues
      .map(hexValue => String.fromCharCode(parseInt(hexValue, 16)))
      .join('');
    return asciiString;
  } catch (error) {
    console.log(error);
  }
  }