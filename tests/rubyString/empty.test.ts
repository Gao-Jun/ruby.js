import ruby from "../../src/ruby.js";

describe('String#empty', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_empty_s
    test('String#empty official tests', () => {
        expect(ruby('', s => s.empty())).toBe(true);
        expect(ruby('', s => s.isEmpty())).toBe(true);
        expect(ruby('not', s => s.empty())).toBe(false);
    });

    test('String#empty official doc', () => {
        expect(ruby('hello', s => s.empty())).toBe(false);
        expect(ruby(' ', s => s.empty())).toBe(false);
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/empty_spec.rb
    test('JRuby String#empty', () => {
        expect(ruby('\x00', s => s.empty())).toBe(false);
    });
});
