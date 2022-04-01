
import {add_number} from '../src/string-calculator';

test('Should sum zero if no numbers', () => {
  expect(add_number('')).toEqual(0);
  expect(add_number('a')).toEqual(0);
});

test('Should return the number when is the only one', () => {
  expect(add_number('1')).toEqual(1);
  expect(add_number('2')).toEqual(2);
  expect(add_number('12')).toEqual(12);
});

test('Should return the addition of multiple numbers separated by commas', () => {
  expect(add_number('1,2')).toEqual(3);
});
