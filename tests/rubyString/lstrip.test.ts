import ruby from "../../src/ruby.js";

describe('String#lstrip', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_lstrip
    test('String#downcase official tests', () => {
        expect(ruby('  hello  ', s => s.lstrip())).toBe('hello  ');
        expect(ruby('   \u3042', s => s.lstrip())).toBe('\u3042');
        // Ruby 3.0+ feature
        // expect(ruby('\x00hello  ', s => s.lstrip())).toBe('hello  ');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/lstrip_spec.rb
    test('returns a copy of self with leading whitespace removed', () => {
        expect(ruby('  hello world  ', s => s.lstrip())).toBe('hello world  ');
        expect(ruby('\n\r\t\n\v\r hello world  ', s => s.lstrip())).toBe('hello world  ');
        expect(ruby('hello', s => s.lstrip())).toBe('hello');
        expect(ruby(' こにちわ', s => s.lstrip())).toBe('こにちわ');
    });
});
