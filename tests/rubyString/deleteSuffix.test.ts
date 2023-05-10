import ruby from "../../src/ruby.js";

describe('String#delete_suffix', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_delete_suffix
    test('String#delete_suffix official tests', () => {
        expect(ruby('hello', s => s.deleteSuffix('lo'))).toBe('hel');
        expect(ruby('hello', s => s.deleteSuffix('he'))).toBe('hello');
        expect(ruby('\u3053\u3093\u306b\u3061\u306f', s => s.deleteSuffix('\u3061\u306f')))
            .toBe('\u3053\u3093\u306b');
        expect(ruby('\u3053\u3093\u306b\u3061\u306f', s => s.deleteSuffix('lo')))
            .toBe('\u3053\u3093\u306b\u3061\u306f');
        expect(ruby('hello', s => s.deleteSuffix('\u3061\u306f'))).toBe('hello');
        expect(ruby('foo\n', s => s.deleteSuffix('\n'))).toBe('foo');
        expect(ruby('foo\r\n', s => s.deleteSuffix('\n'))).toBe('foo\r');
        expect(ruby('foo\r', s => s.deleteSuffix('\n'))).toBe('foo\r');
    });

    test('String#delete_suffix official doc', () => {
        expect(ruby('hello', s => s.deleteSuffix('llo'))).toBe('he');
        expect(ruby('hello', s => s.deleteSuffix('hel'))).toBe('hello');
        expect(ruby('тест', s => s.deleteSuffix('ст'))).toBe('те');
        expect(ruby('こんにちは', s => s.deleteSuffix('ちは'))).toBe('こんに');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/delete_suffix_spec.rb
    test('String#clear JRuby tests', () => {
        expect(ruby('hello', s => s.deleteSuffix('ello'))).toBe('h');
        expect(ruby('hello', s => s.deleteSuffix('hello'))).toBe('');
        expect(ruby('hello', s => s.deleteSuffix('!hello'))).toBe('hello');
        expect(ruby('hello', s => s.deleteSuffix('ell'))).toBe('hello');
        expect(ruby('hello', s => s.deleteSuffix(''))).toBe('hello');
    });
});
