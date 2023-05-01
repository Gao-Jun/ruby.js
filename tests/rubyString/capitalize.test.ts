import ruby from "../../src/ruby";

describe('String#capitalize', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_capitalize
    test('String#capitalize official tests', () => {
        expect(ruby('hello', s => s.capitalize())).toBe('Hello');
        expect(ruby('heLLO', s => s.capitalize())).toBe('Hello');
        expect(ruby('123ABC', s => s.capitalize())).toBe('123abc');
        expect(ruby('ABC', s => s.capitalize())).toBe('Abc');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/capitalize_spec.rb
    test('returns a copy of self with the first character converted to uppercase and the remainder to lowercase', () => {
        expect(ruby('', s => s.capitalize())).toBe('');
        expect(ruby('h', s => s.capitalize())).toBe('H');
        expect(ruby('H', s => s.capitalize())).toBe('H');
        expect(ruby('bcde', s => s.capitalize())).toBe('Bcde');
    });
    test('full Unicode case mapping', () => {
        expect(ruby('äöÜ', s => s.capitalize())).toBe('Äöü');
        expect(ruby('ß', s => s.capitalize())).toBe('Ss');
        expect(ruby('ßeT', s => s.capitalize())).toBe('Sset');
        expect(ruby('', s => s.capitalize())).toBe('');
    });
});
