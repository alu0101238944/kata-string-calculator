
const recursiveStringCalculator = (expression: string, acc: string) => {
  const isEmptyExpression = expression.length === 0;
  const currentChar = expression[0];
  const isDelimiterCurrentChar = [',', '\n'].includes(currentChar);
  let result = 0;
  if (isEmptyExpression || isDelimiterCurrentChar) {
    result += Number(acc);
  }
  if (!isEmptyExpression) {
    if (isDelimiterCurrentChar) {
      result += recursiveStringCalculator(expression.slice(1), '');
    } else {
      result += recursiveStringCalculator(expression.slice(1), acc + currentChar);
    }
  }
  return result;
};

export const stringCalculator = (expression: string) => {
  return recursiveStringCalculator(expression, '');
};
