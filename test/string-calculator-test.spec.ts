
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
  expect(add_number('1,2,4')).toEqual(7);
});

test('Should return the addition of multiple numbers separated by commas or new lines', () => {
  expect(add_number('1,2\n4')).toEqual(7);
  expect(add_number('10\n2\n4,4')).toEqual(20);
});

test('Should specify the delimiter starting with //[delimiter]\\n', () => {
  expect(add_number('//;\n1;2')).toEqual(3);
});

test('Should throw an exception "Negatives not allowed" - and the negative that was passed', () => {
  expect(() => add_number('//;\n-1;2')).toThrowError('Negatives not allowed: -1');
  expect(() => add_number('//;\n1;-2')).toThrowError('Negatives not allowed: -2');
});
