
const toNumber = (symbol: string) => {
  const value = Number(symbol);
  return isNaN(value) ? 0 : value;
};

const sumNumbers = (value1: number, value2: number) => value1 + value2;

const checkPositive = (numbers: Array<number>) => {
  const filtered_numbers = numbers.filter(number => number < 0);
  if (filtered_numbers.length > 0) {
    let filtered_numbers_string = '';
    for (let i = 0; i < filtered_numbers.length; i++) {
      filtered_numbers_string += filtered_numbers[i];
      if (i < filtered_numbers.length - 1) {
        filtered_numbers_string += ', ';
      }
    }
    throw Error('Negatives not allowed: ' + filtered_numbers_string);
  }
};

export const add_number = (operation: string) => {
  let delimiters = /,|\n/;
  if (operation.startsWith('//') && operation.length > 2) {
    delimiters = new RegExp(operation[2]);
    operation = operation.slice(4);
  }

  const numbers = operation.split(delimiters).map(toNumber);
  checkPositive(numbers);
  return numbers.reduce(sumNumbers, 0);
};