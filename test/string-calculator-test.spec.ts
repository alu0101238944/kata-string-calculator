
import {add_number} from '../src/string-calculator';

test('Should sum zero if no numbers', () => {
  expect(add_number('')).toEqual(0);
});

test('Should return the number when is the only one', () => {
  expect(add_number('1')).toEqual(1);
  expect(add_number('2')).toEqual(2);
});
