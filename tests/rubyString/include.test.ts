import ruby from "../../src/ruby.js";

describe('String#include', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_include?
    test('String#include? official tests', () => {
        expect(ruby('foobar', s => s.include('f'))).toBe(true);
        expect(ruby('foobar', s => s.include('foo'))).toBe(true);
        expect(ruby('foobar', s => s.include('baz'))).toBe(false);
        expect(ruby('foobar', s => s.include('z'))).toBe(false);

        expect(ruby('foobar', s => s.isInclude('f'))).toBe(true);
    });

    test('String#include?? official doc sample', () => {
        expect(ruby('foo', s => s.include('f'))).toBe(true);
        expect(ruby('foo', s => s.include('fo'))).toBe(true);
        expect(ruby('foo', s => s.include('food'))).toBe(false);
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/include_spec.rb
    test('returns true if self contains other_str', () => {
        expect(ruby('hello', s => s.include('lo'))).toBe(true);
        expect(ruby('hello', s => s.include('ol'))).toBe(false);
    });
    test('returns true if both strings are empty', () => {
        expect(ruby('', s => s.include(''))).toBe(true);
    });
    test('returns true if the RHS is empty', () => {
        expect(ruby('a', s => s.include(''))).toBe(true);
    });
});
