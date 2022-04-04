
const setDelimiters = (expression: string) => {
  let delimiters = [',', '\n'];
  if (expression.startsWith('//')) {
    expression = expression.slice(2);
    delimiters = [expression[0]];
    expression = expression.slice(1);
    if (expression.startsWith('\n')) {
      expression = expression.slice(1);
      return {
        expression,
        delimiters
      }
    }
  }
  return {
    expression,
    delimiters
  }
};

const recursiveStringCalculator = (expression: string, acc: string, delimiters: Array<string>, negatives: Array<number>) => {
  const isEmptyExpression = expression.length === 0;
  const currentChar = expression[0];
  const isDelimiterCurrentChar = delimiters.includes(currentChar);
  let result = 0;
  if (isEmptyExpression || isDelimiterCurrentChar) {
    const number_acc = Number(acc);
    if (number_acc < 0) {
      negatives.push(number_acc);
    }
    if (isEmptyExpression && negatives.length > 0) {
      throw Error('Negatives not allowed: ' + negatives);
    }
    result += number_acc;
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
