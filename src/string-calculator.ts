
export const add_number = (operation: string) => {
  return operation.split(',').map((symbol) => {
    const number = Number(symbol);
    return isNaN(number) ? 0 : number;
  }).reduce((acc, number) => acc += number, 0);
};
