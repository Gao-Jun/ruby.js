import ruby from "../../src/ruby.js";

describe('String#upcase', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_upcase
    test('String#upcase official tests', () => {
        expect(ruby('hello', s => s.upcase())).toBe('HELLO');
        expect(ruby('hello', s => s.toUpperCase())).toBe('HELLO');
        expect(ruby('hello', s => s.to_upper_case())).toBe('HELLO');
        expect(ruby('hello', s => s.upcase())).toBe('HELLO');
        expect(ruby('HELLO', s => s.upcase())).toBe('HELLO');
        expect(ruby('abc HELLO 123', s => s.upcase())).toBe('ABC HELLO 123');
        expect(ruby('H\0""ello', s => s.upcase())).toBe('H\0""ELLO');
        expect(ruby('\u{1059B}', s => s.upcase())).toBe('\u{10574}');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/upcase_spec.rb
    test('full Unicode case mapping', () => {
        expect(ruby('äöü', s => s.upcase())).toBe('ÄÖÜ');
        expect(ruby('aßet', s => s.upcase())).toBe('ASSET');
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase
    test('String#toUpperCase', () => {

    });
});
