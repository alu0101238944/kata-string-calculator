
import {stringCalculator} from '../src/string-calculator';

test('Should sum zero if empty string', () => {
  expect(stringCalculator('')).toEqual(0);
});

test('Should sum numbers separated with commas', () => {
  expect(stringCalculator('1')).toEqual(1);
  expect(stringCalculator('1,2')).toEqual(3);
  expect(stringCalculator('1,23')).toEqual(24);
});

test('Should sum numbers separated with commas and newlines', () => {
  expect(stringCalculator('1,23\n76')).toEqual(100);
});

test('Should change the default delimiter using "//[delimiter]\\n[numbers…]"', () => {
  expect(stringCalculator('//;\n1;2')).toEqual(3);
});

test('Should throw an exception "Negatives not allowed" - and the negative that was passed', () => {
  expect(() => stringCalculator('//;\n-1;2')).toThrowError('Negatives not allowed: -1');
  expect(() => stringCalculator('//;\n1;-2')).toThrowError('Negatives not allowed: -2');
});
