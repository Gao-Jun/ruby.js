import ruby from "../../src/ruby.js";

describe('String#strip', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_strip
    test('String#strip official tests', () => {
        expect(ruby('      x        ', s => s.strip())).toBe('x');
        expect(ruby(' \n\r\t     x  \t\r\n\n      ', s => s.strip())).toBe('x');
        // Ruby 3.0+ feature
        // expect(ruby('\x00x\x00', s => s.strip())).toBe('x');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/strip_spec.rb
    test('returns a new string with leading and trailing whitespace removed', () => {
        expect(ruby('   hello   ', s => s.strip())).toBe('hello');
        expect(ruby('   hello world   ', s => s.strip())).toBe('hello world');
        expect(ruby('\tgoodbye\r\v\n', s => s.strip())).toBe('goodbye');
        // Ruby 3.0+ feature
        // expect(ruby(' \x00 goodbye \x00 ', s => s.strip())).toBe('goodbye');
    });
});
