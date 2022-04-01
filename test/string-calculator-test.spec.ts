
import {add_number} from '../src/string-calculator';

test('shouldSumZeroIfNoNumbers', () => {
  expect(add_number('')).toEqual(0);
});
