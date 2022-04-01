
export const add_number = (operation: string) => {
  let value = 0;
  for (let char of operation) {
    value += isNaN(Number(char)) ? 0 : Number(char);
  }
  return value;
};
