import ruby from "../../src/ruby.js";

describe('String#toS', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_to_s
    test('String#chars official tests', () => {
        expect(ruby('me', s => s.toS())).toBe('me');
        expect(ruby('me', s => s.to_s())).toBe('me');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/shared/to_s.rb
    test('returns an array when no block given', () => {
        expect(ruby('a string', s => s.toS())).toBe('a string');
    });
});
