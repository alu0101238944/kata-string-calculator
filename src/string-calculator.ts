
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

export const addNumber = (operation: string) => {
  let delimiters = /,|\n/;
  if (operation.startsWith('//') && operation.length > 2) {
    operation = operation.slice(2);
    if (operation[0] == '[') {
      operation = operation.slice(1);
      delimiters = new RegExp(operation.split(']')[0]);
    } else {
      delimiters = new RegExp(operation.split('\n')[0]);
    }
    operation = operation.split('\n')[1];
  }

  let numbers = operation.split(delimiters).map(toNumber);
  checkPositive(numbers);
  numbers = numbers.filter(number => number <= 1000);
  return numbers.reduce(sumNumbers, 0);
};
