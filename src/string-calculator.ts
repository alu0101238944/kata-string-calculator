
const toNumber = (symbol: string) => {
  const value = Number(symbol);
  return isNaN(value) ? 0 : value;
}

const sumNumbers = (value1: number, value2: number) => value1 + value2;

export const add_number = (operation: string) => {
  let delimiters = /,|\n/;
  if (operation.startsWith('//') && operation.length > 2) {
    delimiters = new RegExp(operation[2]);
    operation = operation.slice(3);
  }
  return operation
    .split(delimiters)
    .map(toNumber)
    .reduce(sumNumbers, 0)
  };