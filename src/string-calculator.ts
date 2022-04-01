
export const add_number = (operation: string) => {
  return isNaN(Number(operation)) ? 0 : Number(operation);
};
