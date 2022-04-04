
const recursiveStringCalculator = (expression: string, acc: string) => {
  const isEmptyExpression = expression.length === 0;
  const currentChar = expression[0];
  const isCommaCurrentChar = currentChar === ',';
  let result = 0;
  if (isEmptyExpression || isCommaCurrentChar) {
    result += Number(acc);
  }
  if (!isEmptyExpression) {
    if (isCommaCurrentChar) {
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
