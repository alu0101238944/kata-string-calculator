
const toNumber = (symbol: string) => {
  const value = Number(symbol);
  return isNaN(value) ? 0 : value;
}

const sumNumbers = (value1: number, value2: number) => value1 + value2;

export const add_number = (operation: string) =>
  operation
    .split(/,|\n/)
    .map(toNumber)
    .reduce(sumNumbers, 0);