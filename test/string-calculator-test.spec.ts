
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

test('Should change the default delimiter', () => {
  expect(stringCalculator('//;\n1;2')).toEqual(3);
});

test('Negatives not allowed, and show the negative that was passed', () => {
  expect(() => stringCalculator('//;\n-1;2')).toThrowError('Negatives not allowed: -1');
  expect(() => stringCalculator('//;\n1;-2')).toThrowError('Negatives not allowed: -2');
});

test('Show all passed negatives', () => {
  expect(() => stringCalculator('//;\n-1;-2')).toThrowError('Negatives not allowed: -1,-2');
});

test('Should ignore numbers bigger than 1000', () => {
  expect(stringCalculator('//;\n6;3;1;1001')).toEqual(10);
});

test('Should be possible to use delimiters of any length', () => {
  expect(stringCalculator('//[***]\n1***2***3')).toEqual(6);
});

test('Should allow multiple delimiters', () => {
  expect(stringCalculator('//[*][%]\n1*2%3')).toEqual(6);
});
