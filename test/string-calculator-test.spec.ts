
import {stringCalculator} from '../src/string-calculator';

test('Should sum zero if empty string', () => {
  expect(stringCalculator('')).toEqual(0);
});
