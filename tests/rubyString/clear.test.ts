import ruby from "../../src/ruby.js";

describe('String#clear', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_clear
    test('String#clear official tests', () => {
        expect(ruby('foo', s => s.repeat(100).clear())).toBe('');
    });

    test('String#clear official doc', () => {
        expect(ruby('foo', s => s.clear())).toBe('');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/clear_spec.rb
    test('String#clear JRuby tests', () => {
        expect(ruby('Jolene', s => s.clear())).toBe('');
        expect(ruby('\u9765\u0876', s => s.clear())).toBe('');
    });
});
