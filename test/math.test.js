import * as math from '../src/math.js';

test('add 1 and 3 to eq 3', () => {
    expect(math.sum(1, 2)).toBe(3)
})

test('subtrackt 1 from 3 to eq 2', () => {
    expect(math.sub(3, 1)).toBe(2)
})

test('multiply 2 and 4 to eq 8', () => {
    expect(math.multiply(2, 4)).toBe(8)
})

test('divide 8 and 4 to eq 2', () => {
    expect(math.divide(8, 4)).toBe(2)
})
