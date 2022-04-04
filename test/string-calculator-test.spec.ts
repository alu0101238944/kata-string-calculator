
import {stringCalculator} from '../src/string-calculator';

test('Should sum zero if empty string', () => {
  expect(stringCalculator('')).toEqual(0);
});

test('Should sum numbers separated with commas', () => {
  expect(stringCalculator('1')).toEqual(1);
  expect(stringCalculator('1,2')).toEqual(3);
  expect(stringCalculator('1,23')).toEqual(24);
});
