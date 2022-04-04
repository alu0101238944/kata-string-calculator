
export const stringCalculator = (expression: string) => {
  if (expression.length === 0) {
    return 0;
  }
  const current_number = Number(expression[0]);
  return (isNaN(current_number) ? 0 : current_number) +
      stringCalculator(expression.slice(1));
};
