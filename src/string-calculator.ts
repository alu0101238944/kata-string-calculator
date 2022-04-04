
const recursiveStringCalculator = (expression: string, acc: string) => {
  if (expression.length === 0) {
    return Number(acc);
  }
  const current_char = expression[0];
  if (current_char === ',') {
    return Number(acc) + recursiveStringCalculator(expression.slice(1), '');
  }
  return recursiveStringCalculator(expression.slice(1), acc + current_char);
};

export const stringCalculator = (expression: string) => {
  return recursiveStringCalculator(expression, '');
};
