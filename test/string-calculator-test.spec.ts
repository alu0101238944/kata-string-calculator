
import {stringCalculator} from '../src/string-calculator';

test('Should sum zero if empty string', () => {
  expect(stringCalculator('')).toEqual(0);
});

test('Should return the number when is the only one', () => {
  expect(stringCalculator('1')).toEqual(1);
  expect(stringCalculator('2')).toEqual(2);
  expect(stringCalculator('12')).toEqual(12);
});

test('Should return the addition of multiple numbers separated by commas', () => {
  expect(stringCalculator('1,2')).toEqual(3);
  expect(stringCalculator('1,2,4')).toEqual(7);
});

test('Should return the addition of multiple numbers separated by commas or new lines', () => {
  expect(stringCalculator('1,2\n4')).toEqual(7);
  expect(stringCalculator('10\n2\n4,4')).toEqual(20);
});

test('Should specify the delimiter starting with //[delimiter]\\n', () => {
  expect(stringCalculator('//;\n1;2')).toEqual(3);
});

test('Should throw an exception "Negatives not allowed" - and the negative that was passed', () => {
  expect(() => stringCalculator('//;\n-1;2')).toThrowError('Negatives not allowed: -1');
  expect(() => stringCalculator('//;\n1;-2')).toThrowError('Negatives not allowed: -2');
});

test('Should show all negatives in the exception message', () => {
  expect(() => stringCalculator('//;\n-1;-2')).toThrowError('Negatives not allowed: -1, -2');
});

test('Should be ignored numbers bigger than 1000', () => {
  expect(stringCalculator('//;\n6;3;1;1001')).toEqual(10);
});

test('Should delimiters can be of any length with the following format: "//[delimiter]\\n"', () => {
  expect(stringCalculator('//[;-;]\n2;-;10;-;3')).toEqual(15);
});

test('Should allow multiple delimiters like this: "//[delim1][delim2]\\n"', () => {
  expect(stringCalculator('//[*][%]\n1*2%3')).toEqual(6);
});
