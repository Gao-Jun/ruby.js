import ruby from "../../src/ruby.js";

describe('String#codepoints', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_codepoints
    test('String#codepoints official tests', () => {
        expect(ruby('ABC', s => s.codepoints())).toStrictEqual([65, 66, 67]);
        expect(ruby('\u3042\u3044\u3046', s => s.codepoints())).toStrictEqual([0x3042, 0x3044, 0x3046]);
    });

    test('String#codepoints official doc', () => {
        expect(ruby('hello', s => s.codepoints())).toStrictEqual([104, 101, 108, 108, 111]);
        expect(ruby('тест', s => s.codepoints())).toStrictEqual([1090, 1077, 1089, 1090]);
        expect(ruby('こんにちは', s => s.codepoints())).toStrictEqual([12371, 12435, 12395, 12385, 12399]);
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/codepoints_spec.rb
    test('String#chr JRuby tests', () => {
        expect(ruby('abc', s => s.codepoints())).toStrictEqual([97, 98, 99]);
    });
});
