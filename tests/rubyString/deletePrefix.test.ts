import ruby from "../../src/ruby.js";

describe('String#delete_prefix', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_delete_prefix
    test('String#cdelete_prefix official tests', () => {
        expect(ruby('hello', s => s.deletePrefix('hel'))).toBe('lo');
        expect(ruby('hello', s => s.delete_prefix('lo'))).toBe('hello');
        expect(ruby('\u3053\u3093\u306b\u3061\u306f', s => s.deletePrefix('\u3053\u3093')))
            .toBe('\u306b\u3061\u306f');
        expect(ruby('\u3053\u3093\u306b\u3061\u306f', s => s.deletePrefix('hel')))
            .toBe('\u3053\u3093\u306b\u3061\u306f');
        expect(ruby('abba', s => s.deletePrefix('a'))).toBe('bba');
    });

    test('String#delete_prefix official doc', () => {
        expect(ruby('hello', s => s.deletePrefix('llo'))).toBe('hello');
        expect(ruby('тест', s => s.deletePrefix('те'))).toBe('ст');
        expect(ruby('こんにちは', s => s.deletePrefix('こん'))).toBe('にちは');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/delete_prefix_spec.rb
    test('String#delete_prefix JRuby tests', () => {
        expect(ruby('hello', s => s.deletePrefix('hell'))).toBe('o');
        expect(ruby('hello', s => s.deletePrefix('hello'))).toBe('');
        expect(ruby('hello', s => s.deletePrefix('hello!'))).toBe('hello');
        expect(ruby('hello', s => s.deletePrefix('ell'))).toBe('hello');
        expect(ruby('hello', s => s.deletePrefix(''))).toBe('hello');
    });
});
