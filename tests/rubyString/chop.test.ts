import ruby from "../../src/ruby.js";

describe('String#chomp', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_chop
    test('String#chop official tests', () => {
        expect(ruby('hello', s => s.chop())).toBe('hell');
        expect(ruby('hello\r\n', s => s.chop())).toBe('hello');
        expect(ruby('hello\n\r', s => s.chop())).toBe('hello\n');
        expect(ruby('\r\n', s => s.chop())).toBe('');
        expect(ruby('', s => s.chop())).toBe('');
        expect(ruby('a\u00d8', s => s.chop())).toBe('a');
    });

    test('String#chop official doc', () => {
        expect(ruby('abc\r\n', s => s.chop())).toBe('abc');
        expect(ruby('тест\r\n', s => s.chop())).toBe('тест');
        expect(ruby('こんにちは\r\n', s => s.chop())).toBe('こんにちは');
        expect(ruby('abcd', s => s.chop())).toBe('abc');
        expect(ruby('тест', s => s.chop())).toBe('тес');
        expect(ruby('こんにちは', s => s.chop())).toBe('こんにち');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/chop_spec.rb
    test('String#chop JRuby tests', () => {
        expect(ruby('abc', s => s.chop())).toBe('ab');
        expect(ruby('abc\r', s => s.chop())).toBe('abc');
        expect(ruby('abc\n', s => s.chop())).toBe('abc');
        expect(ruby('abc\r\n', s => s.chop())).toBe('abc');
        expect(ruby('abc\r\n\r\n', s => s.chop())).toBe('abc\r\n');
        expect(ruby('あれ', s => s.chop())).toBe('あ');
        expect(ruby('あれ\r\n', s => s.chop())).toBe('あれ');
    });
});
