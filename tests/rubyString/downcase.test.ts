import ruby from "../../src/ruby.js";

describe('String#downcase', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_downcase
    test('String#downcase official tests', () => {
        expect(ruby('helLo', s => s.downcase())).toBe('hello');
        expect(ruby('hello', s => s.downcase())).toBe('hello');
        expect(ruby('HELLO', s => s.downcase())).toBe('hello');
        expect(ruby('abc HELLO 123', s => s.downcase())).toBe('abc hello 123');
        expect(ruby('h\u{0000}ELLO', (s: { downcase: () => any; }) => s.downcase())).toBe('h\u{0000}ello');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/downcase_spec.rb
    test('full Unicode case mapping', () => {
        expect(ruby('ÄÖÜ', s => s.downcase())).toBe('äöü');
        expect(ruby('\u{212A}ING', s => s.downcase())).toBe('king');
    });
});
