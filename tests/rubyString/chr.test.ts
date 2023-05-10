import ruby from "../../src/ruby.js";

describe('String#chars', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_chr
    test('String#chr official tests', () => {
        expect(ruby('abcde', s => s.chr())).toBe('a');
        expect(ruby('a', s => s.chr())).toBe('a');
        expect(ruby('\u3042\u3043', s => s.chr())).toBe('\u3042');
        expect(ruby('', s => s.chr())).toBe('');
    });

    test('String#chr official doc', () => {
        expect(ruby('foo', s => s.chr())).toBe('f');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/chr_spec.rb
    test('String#chr JRuby tests', () => {
        expect(ruby('e', s => s.chr())).toBe('e');
        expect(ruby('Goodbye, world', s => s.chr())).toBe('G');
        expect(ruby('\u9879', s => s.chr())).toBe('\u9879');
        expect(ruby('\u8082\u{77082}', s => s.chr())).toBe('\u8082');
    });
});
