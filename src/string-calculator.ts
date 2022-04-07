
const setDelimiters = (expression: string): [string[], string] => {
  let delimiters = [',', '\n']; // Default delimiters
  if (expression.startsWith('//')) {
    expression = expression.slice(2); // '//'
    const current_char = expression[0];
    if (current_char !== '[') { // Unique delimiter
      delimiters = [current_char];
      expression = expression.slice(1);
      if (expression.startsWith('\n')) {
        expression = expression.slice(1);
      } else {
        throw Error('Unique delimiter ' + delimiters[0]
            + ' must be separated from the evaluated expression by a newline');
      }
    } else { // Multiple delimiters
      delimiters = getMultipleDelimiters(expression, []);
      expression = String(expression.split('\n').slice(1));
    }
  }
  return [
    delimiters,
    expression
  ]
};

const getMultipleDelimiters = (expression: string,
    delimiters: Array<string>) => {
  expression = expression.slice(1); // '['
  const delimiter = getDelimiter(expression, '');
  expression = expression.slice(delimiter.length + 1); // delimiter ']'
  delimiters.push(delimiter);
  if (expression[0] === '[') {
    return getMultipleDelimiters(expression, delimiters);
  } else {
    return delimiters;
  }
};

const getDelimiter = (expression: string, acc: string) => {
  const current_char = expression[0];
  if (current_char !== ']') {
    return getDelimiter(expression.slice(1), acc + current_char);
  } else {
    return acc;
  }
};

const isNumericChar = (char: string) => char === '-' || (char >= '0' && char <= '9');

const skipDelimiter = (expression: string, acc: string) => {
  if (isNumericChar(expression[1])) {
    return [expression, acc + expression[0]];
  } else {
    return skipDelimiter(expression.slice(1), acc + expression[0]);
  }
};

const recursiveStringCalculator = (expression: string,
    acc: string, delimiters: Array<string>, negatives: Array<number>) => {
  const isEmptyExpression = expression.length === 0;
  let currentChar = expression[0];
  const isDelimiterCurrentChar = !isNumericChar(currentChar);

  if (isDelimiterCurrentChar && currentChar) {
    const [expression_skipped, delimiter] = skipDelimiter(expression, '');
    expression = expression_skipped;
    currentChar = expression_skipped[expression_skipped.length - 1];
    if (!delimiters.includes(delimiter)) {
      throw Error('Delimiter ' + delimiter + ' is not in setted delimiters ' + delimiters);
    }
  }

  let result = 0;
  if (isEmptyExpression || isDelimiterCurrentChar) {
    const number_acc = Number(acc);
    if (number_acc < 0) {
      negatives.push(number_acc);
    }
    if (isEmptyExpression && negatives.length > 0) {
      throw Error('Negatives not allowed: ' + negatives);
    }
    result += number_acc <= 1000 ? number_acc : 0;
  }
  if (!isEmptyExpression) {
    let currentAcc = '';
    if (!isDelimiterCurrentChar) {
      currentAcc = acc + currentChar;
    }
    result += recursiveStringCalculator(expression.slice(1), currentAcc, delimiters, negatives);
  }
  return result;
};

export const stringCalculator = (expression: string) => {
  const [parsedDelimiters, parsedExpression] = setDelimiters(expression);
  return recursiveStringCalculator(parsedExpression, '', parsedDelimiters, []);
};
