import creator from '../index.js';
import cases from '../__mocks__/cases';


describe('Test Formatter', () => {
  it.each(cases)('should handle %s', (name, format, mapper, input, expected) => {
    const formatter = creator({format,mapper});
    const actual = formatter(input);
    expect(actual).toBe(expected);
  });
});
