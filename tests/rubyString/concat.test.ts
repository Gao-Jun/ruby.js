import ruby from "../../src/ruby.js";

describe('String#concat', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_concat
    test('String#concat official tests', () => {
        expect(ruby('world', s => s.concat(33))).toBe('world!');
        expect(ruby('world', s => s.concat('!'))).toBe('world!');
        const b = 'sn';
        expect(ruby(b, s => s.concat(b, b))).toBe('snsnsn');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/concat_spec.rb
    test('takes multiple arguments', () => {
        expect(ruby('hello ', s => s.concat('wo', '', 'rld'))).toBe('hello world');
    });
    test('concatenates the initial value when given arguments contain 2 self', () => {
        const str = 'hello';
        expect(ruby(str, s => s.concat(str, str))).toBe('hellohellohello');
    });
    test('returns self when given no arguments', () => {
        expect(ruby('hello', s => s.concat())).toBe('hello');
    });
});
