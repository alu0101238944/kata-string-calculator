
const setDelimiters = (expression: string) => {
  let delimiters = [',', '\n'];
  if (expression.startsWith('//')) {
    expression = expression.slice(2);
    const current_char = expression[0];
    if (current_char !== '[') {
      delimiters = [current_char];
      expression = expression.slice(1);
      if (expression.startsWith('\n')) {
        expression = expression.slice(1);
      }
    } else {
      delimiters = getMultipleDelimiters(expression, []);
      expression = String(expression.split('\n').slice(1));
    }
  }
  return {
    expression,
    delimiters
  }
};

const getMultipleDelimiters = (expression: string,
    delimiters: Array<string>) => {
  expression = expression.slice(1);
  const delimiter = getDelimiter(expression, '');
  expression = expression.slice(delimiter.length + 1);
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

const isDigit = (char: string) => char == '-' || (char >= '0' && char <= '9');

const skipDelimiter = (expression: string, acc: string) => {
  if (isDigit(expression[1])) {
    return [expression, acc];
  } else {
    return skipDelimiter(expression.slice(1), acc + expression[0]);
  }
};

const recursiveStringCalculator = (expression: string,
    acc: string, delimiters: Array<string>, negatives: Array<number>) => {
  const isEmptyExpression = expression.length === 0;
  let currentChar = expression[0];
  const isDelimiterCurrentChar = !isDigit(currentChar);
  if (isDelimiterCurrentChar && currentChar) {
    const [expression_skipped, delimiter] = skipDelimiter(expression, '');
    expression = expression_skipped;
    currentChar = expression[0];
    if (!delimiters.includes(delimiter + currentChar)) {
      throw Error('Delimiter ' + delimiter + ' is not in default delimiters ' + delimiters);
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
    if (isDelimiterCurrentChar) {
      result += recursiveStringCalculator(expression.slice(1), '', delimiters, negatives);
    } else {
      result += recursiveStringCalculator(expression.slice(1), acc + currentChar, delimiters, negatives);
    }
  }
  return result;
};

export const stringCalculator = (expression: string) => {
  const {'delimiters': parsedDelimiters, 'expression': parserdExpression} = setDelimiters(expression);
  return recursiveStringCalculator(parserdExpression, '', parsedDelimiters, []);
};
