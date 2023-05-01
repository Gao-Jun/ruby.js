import ruby from "../../src/ruby";

describe('String#chars', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_chars
    test('String#chars official tests', () => {
        expect(ruby('ABC', s => s.chars())).toStrictEqual(['A', 'B', 'C']);
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/chars_spec.rb
    test('returns an array when no block given', () => {
        expect(ruby('hello', s => s.chars())).toStrictEqual(['h', 'e', 'l', 'l', 'o']);
    });
});
