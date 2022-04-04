
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

const parseDelimiters = (expression: string) => {
  let delimiters = /,|\n/;
  if (expression.startsWith('//') && expression.length > 2) {
    delimiters = /^$x/; // Does not match anything
    expression = expression.slice(2); // '//'
    if (expression[1] === '\n') { // Unique unitary delimiter
      delimiters = new RegExp(escapeRegExp(expression[0]));
    } else if (expression[0] === '[') {
      while (expression[0] !== '\n') {
        expression = expression.slice(1); // '['
        let current_delimiter = '';
        while (expression[0] !== ']') {
          current_delimiter += expression[0];
          expression = expression.slice(1);
        }
        expression = expression.slice(1); // ']'
        delimiters = new RegExp(delimiters.source + '|' +
            new RegExp(escapeRegExp(current_delimiter)).source);
      }
    }
    expression = expression.slice(1); // '\n'
  }
  return {expression, delimiters};
};

export const stringCalculator = (expression: string) => {
  const {
    'expression': parsedExpression,
    'delimiters': parsedDelimiters
  } = parseDelimiters(expression);

  let numbers = parsedExpression.split(parsedDelimiters).map(toNumber);
  checkPositive(numbers);
  numbers = numbers.filter(number => number <= 1000);
  return numbers.reduce(sumNumbers, 0);
};
