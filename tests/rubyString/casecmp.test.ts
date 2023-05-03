import ruby from "../../src/ruby.js";

describe('String#casecmp', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#case_cmp
    test('String#casecmp official tests', () => {
        expect(ruby('FoO', s => s.casecmp('fOO'))).toBe(0);
        expect(ruby('FoO', s => s.casecmp('BaR'))).toBe(1);
        expect(ruby('baR', s => s.casecmp('FoO'))).toBe(-1);
        expect(ruby('\u3042B', s => s.casecmp('\u3042a'))).toBe(1);
        expect(ruby('foo', s => s.casecmp('foo\0'))).toBe(-1);
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/casecmp_spec.rb
    test('returns -1 when less than other', () => {
        expect(ruby('a', s => s.casecmp('b'))).toBe(-1);
        expect(ruby('A', s => s.casecmp('b'))).toBe(-1);
    });
    test('returns 0 when equal to other', () => {
        expect(ruby('a', s => s.casecmp('a'))).toBe(0);
        expect(ruby('A', s => s.casecmp('a'))).toBe(0);
    });
    test('returns 1 when greater than other', () => {
        expect(ruby('b', s => s.casecmp('a'))).toBe(1);
        expect(ruby('B', s => s.casecmp('a'))).toBe(1);
    });
    // test('for non-ASCII characters', () => {
    //     expect(ruby('Ã', s => s.casecmp('ã'))).toBe(-1);
    //     expect(ruby('Ã', s => s.casecmp('Ä'))).toBe(-1);
    // });
    test('return 0 for empty string', () => {
        expect(ruby('', s => s.casecmp(''))).toBe(0);
    });
})
