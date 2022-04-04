
const recursiveStringCalculator = (expression: string, acc: string, delimiters: Array<string>) => {
  const isEmptyExpression = expression.length === 0;
  const currentChar = expression[0];
  const isDelimiterCurrentChar = delimiters.includes(currentChar);
  let result = 0;
  if (isEmptyExpression || isDelimiterCurrentChar) {
    result += Number(acc);
  }
  if (!isEmptyExpression) {
    if (isDelimiterCurrentChar) {
      result += recursiveStringCalculator(expression.slice(1), '', delimiters);
    } else {
      result += recursiveStringCalculator(expression.slice(1), acc + currentChar, delimiters);
    }
  }
  return result;
};

export const stringCalculator = (expression: string) => {
  return recursiveStringCalculator(expression, '', [',', '\n']);
};
