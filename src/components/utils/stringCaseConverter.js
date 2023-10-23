export const sampleInput = "Hello from Devta"
export const toCamelCase = (userInput) => {
    return isPascalCase(userInput) ? String(userInput).replace(/^./, (match) => match.toLowerCase()) : String(userInput).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

const isPascalCase = (userInput) => {
    return /^[A-Z][a-zA-Z0-9]*$/.test(String(userInput));
}

export const toSnakeCase = (userInput) => {
    return String(userInput).replace(/\s+/g, '_').replace(/[-+*]/g, "_").replace(/([^A-Z])([A-Z])/g, '$1_$2').replace(/\s/g, '_').replace(/_+/g, "_").toLowerCase();
}

export const toKebabCase = (userInput) => {
    return String(userInput)
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

export const toPascalCase = (userInput) => {
    return toKebabCase(String(userInput)).replace(/(^|-|_)([a-z])/g, (match, delimiter, char) => char.toUpperCase());
}
  
export const toMacroCase = (userInput) => {
    return String(userInput).replace(/(?<!\b|[A-Z])([A-Z])/g, '_$1').toUpperCase().replace(/[^A-Z0-9]+/g, '_');
}

export const toTrainCase = (userInput) => {
    return String(userInput).replace(/(?<!\b|[A-Z])([A-Z])/g, '-$1').replace(/[^A-Za-z0-9]+/g, '-').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-');
}

export const ifNull = (userInput) => {
    if (userInput == null) {
        return true;
    }
    else {
        return false;
    }
}