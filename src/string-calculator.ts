
const toNumber = (symbol: string) => {
  const value = Number(symbol);
  if (isNaN(value)) {
    throw Error('Invalid value: ' + symbol);
  }
  return value;
};

const sumNumbers = (value1: number, value2: number) => value1 + value2;

const checkPositive = (numbers: Array<number>) => {
  const filtered_numbers = numbers.filter(number => number < 0);
  if (filtered_numbers.length > 0) {
    let filtered_numbers_string = '';
    for (let i = 0; i < filtered_numbers.length; i++) {
      filtered_numbers_string += filtered_numbers[i] +
          ((i < filtered_numbers.length - 1) ? ', ' : '');
    }
    throw Error('Negatives not allowed: ' + filtered_numbers_string);
  }
};

const escapeRegExp = (string) => 
    string.replace(/[.*+?^${}()|\\]/g, '\\$&');

export const addNumber = (operation: string) => {
  let delimiters = /,|\n/;
  if (operation.startsWith('//') && operation.length > 2) {
    delimiters = /^$x/; // Does not match anything
    operation = operation.slice(2); // '//'
    if (operation[1] == '\n') {
      delimiters = new RegExp(operation[0]);
    } else if (operation[0] == '[') {
      while (operation[0] !== '\n') {
        operation = operation.slice(1); // '['
        let current_delimiter = '';
        while (operation[0] !== ']') {
          current_delimiter += operation[0];
          operation = operation.slice(1);
        }
        operation = operation.slice(1); // ']'
        delimiters = new RegExp(delimiters.source + '|' +
            new RegExp(escapeRegExp(current_delimiter)).source);
      }
    }
    operation = operation.slice(1); // '\n'
  }

  let numbers = operation.split(delimiters).map(toNumber);
  checkPositive(numbers);
  numbers = numbers.filter(number => number <= 1000);
  return numbers.reduce(sumNumbers, 0);
};
