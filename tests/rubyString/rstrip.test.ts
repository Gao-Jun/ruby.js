import ruby from "../../src/ruby.js";

describe('String#rstrip', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_rstrip
    test('String#downcase official tests', () => {
        expect(ruby('  hello  ', s => s.rstrip())).toBe('  hello');
        expect(ruby('\u3042   ', s => s.rstrip())).toBe('\u3042');
        // Ruby 3.0+ feature
        // expect(ruby('\u3042\u0000', s => s.rstrip())).toBe('\u3042');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/rstrip_spec.rb
    test('returns a copy of self with trailing whitespace removed', () => {
        expect(ruby('  hello  ', s => s.rstrip())).toBe('  hello');
        expect(ruby('  hello world  ', s => s.rstrip())).toBe('  hello world');
        expect(ruby('  hello world  \n\r\t\n\v\r', s => s.rstrip())).toBe('  hello world');
        expect(ruby('hello', s => s.rstrip())).toBe('hello');
        expect(ruby('こにちわ  ', s => s.rstrip())).toBe('こにちわ');
    });
});
