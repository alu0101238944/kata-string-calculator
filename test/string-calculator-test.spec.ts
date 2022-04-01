
import {addNumber} from '../src/string-calculator';

test('Should sum zero if empty string', () => {
  expect(addNumber('')).toEqual(0);
});

test('Should return the number when is the only one', () => {
  expect(addNumber('1')).toEqual(1);
  expect(addNumber('2')).toEqual(2);
  expect(addNumber('12')).toEqual(12);
});

test('Should return the addition of multiple numbers separated by commas', () => {
  expect(addNumber('1,2')).toEqual(3);
  expect(addNumber('1,2,4')).toEqual(7);
});

test('Should return the addition of multiple numbers separated by commas or new lines', () => {
  expect(addNumber('1,2\n4')).toEqual(7);
  expect(addNumber('10\n2\n4,4')).toEqual(20);
});

test('Should specify the delimiter starting with //[delimiter]\\n', () => {
  expect(addNumber('//;\n1;2')).toEqual(3);
});

test('Should throw an exception "Negatives not allowed" - and the negative that was passed', () => {
  expect(() => addNumber('//;\n-1;2')).toThrowError('Negatives not allowed: -1');
  expect(() => addNumber('//;\n1;-2')).toThrowError('Negatives not allowed: -2');
});

test('Should show all negatives in the exception message', () => {
  expect(() => addNumber('//;\n-1;-2')).toThrowError('Negatives not allowed: -1, -2');
});

test('Should be ignored numbers bigger than 1000', () => {
  expect(addNumber('//;\n6;3;1;1001')).toEqual(10);
});


test('Delimiters can be of any length', () => {
  expect(addNumber('//;-;\n2;-;10;-;3')).toEqual(15);
});

