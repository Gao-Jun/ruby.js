import ruby from "../../src/ruby.js";

describe('String#chomp', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_chomp
    test('String#chomp official tests', () => {
        expect(ruby('hello', s => s.chomp("\n"))).toBe('hello');
        expect(ruby('hello\n', s => s.chomp("\n"))).toBe('hello');
        expect(ruby('hello', s => s.chomp())).toBe('hello');
        expect(ruby('hello', s => s.chomp())).toBe('hello');
        expect(ruby('a\u0101', s => s.chomp("\u0101"))).toBe('a');
        expect(ruby('hello', s => s.chomp("lo"))).toBe('hel');
        expect(ruby('hello', s => s.chomp("he"))).toBe('hello');
        expect(ruby('\u3053\u3093\u306b\u3061\u306f', s => s.chomp("\u3061\u306f")))
            .toBe('\u3053\u3093\u306b');
        expect(ruby('\u3053\u3093\u306b\u3061\u306f', s => s.chomp("lo")))
            .toBe('\u3053\u3093\u306b\u3061\u306f');
        expect(ruby('hello', s => s.chomp("\u3061\u306f"))).toBe('hello');
        expect(ruby('foo\n', s => s.chomp("\n"))).toBe('foo');
        expect(ruby('foo\r\n', s => s.chomp("\n"))).toBe('foo');
        expect(ruby('foo\r', s => s.chomp("\n"))).toBe('foo');
    });

    test('String#chomp official doc', () => {
        expect(ruby('abc\r', s => s.chomp())).toBe('abc');
        expect(ruby('abc\n', s => s.chomp())).toBe('abc');
        expect(ruby('abc\r\n', s => s.chomp())).toBe('abc');
        expect(ruby('abc\n\r', s => s.chomp())).toBe('abc\n');
        expect(ruby('тест\r\n', s => s.chomp())).toBe('тест');
        expect(ruby('こんにちは\r\n', s => s.chomp())).toBe('こんにちは');

        expect(ruby('abc\n\n\n', s => s.chomp(''))).toBe('abc');
        expect(ruby('abc\r\n\r\n\r\n', s => s.chomp(''))).toBe('abc');
        expect(ruby('abc\n\n\r\n\r\n\n\n', s => s.chomp(''))).toBe('abc');
        expect(ruby('abc\n\r\n\r\n\r', s => s.chomp(''))).toBe('abc\n\r\n\r\n\r');
        expect(ruby('abc\r\r\r', s => s.chomp(''))).toBe('abc\r\r\r');

        expect(ruby('abcd', s => s.chomp('d'))).toBe('abc');
        expect(ruby('abcdd', s => s.chomp('d'))).toBe('abcd');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/chomp_spec.rb
    test('String#chomp JRuby tests', () => {
        expect(ruby('abc', s => s.chomp())).toBe('abc');
        expect(ruby('abc\n\n', s => s.chomp())).toBe('abc\n');
        expect(ruby('abc\r\r', s => s.chomp())).toBe('abc\r');
        expect(ruby('abc\r\n\r\n', s => s.chomp())).toBe('abc\r\n');
        expect(ruby('', s => s.chomp())).toBe('');
        expect(ruby('abcdef', s => s.chomp('cdef'))).toBe('ab');
        expect(ruby('\xa0\xa1\n', s => s.chomp())).toBe('\xa0\xa1');
        expect(ruby('abc\n', s => s.chomp(''))).toBe('abc');
        expect(ruby('abc\r\n', s => s.chomp(''))).toBe('abc');
        expect(ruby('abc\r', s => s.chomp(''))).toBe('abc\r');
        expect(ruby('', s => s.chomp(''))).toBe('');
        expect(ruby('\xa0\xa1\n', s => s.chomp(''))).toBe('\xa0\xa1');
        expect(ruby('abc\n\n', s => s.chomp('\n'))).toBe('abc\n');
        expect(ruby('abc\r\r', s => s.chomp('\n'))).toBe('abc\r');
        expect(ruby('abc\r\n\r\n', s => s.chomp('\n'))).toBe('abc\r\n');
        expect(ruby('', s => s.chomp('\n'))).toBe('');
        expect(ruby('abcabc', s => s.chomp('abc'))).toBe('abc');
        expect(ruby('abc', s => s.chomp('def'))).toBe('abc');
        expect(ruby('', s => s.chomp('abc'))).toBe('');
        expect(ruby('abc', s => s.chomp('abc'))).toBe('');
        expect(ruby('あれ', s => s.chomp())).toBe('あれ');
        expect(ruby('あれ\r\n', s => s.chomp())).toBe('あれ');
    });
});
