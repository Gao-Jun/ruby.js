import ruby from "../../src/ruby.js";

describe('String#endWith', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_end_with?
    test('String#end_with? official tests', () => {
        expect(ruby('hello', s => s.endWith('llo'))).toBe(true);
        expect(ruby('hello', s => s.endWith('ll'))).toBe(false);
        expect(ruby('hello', s => s.endWith('el', 'lo'))).toBe(true);
        expect(ruby('hello', s => s.endWith(''))).toBe(true);
        expect(ruby('hello', s => s.endWith())).toBe(false);

        expect(ruby('hello', s => s.end_with('llo'))).toBe(true);
        expect(ruby('hello', s => s.isEndWith('llo'))).toBe(true);
    });

    test('String#end_with? official doc sample', () => {
        expect(ruby('hello', s => s.endWith('ello'))).toBe(true);
        expect(ruby('hello', s => s.endWith('heaven', 'ello'))).toBe(true);
        expect(ruby('hello', s => s.end_with('heaven', 'paradise'))).toBe(false);
        expect(ruby('тест', s => s.end_with('т'))).toBe(true);
        expect(ruby('こんにちは', s => s.end_with('は'))).toBe(true);
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/shared/string/end_with.rb
    test('returns true only if ends match', () => {
        expect(ruby('hello', s => s.endWith('o'))).toBe(true);
    });
    test('returns true only if any ending match', () => {
        expect(ruby('hello', s => s.endWith('x', 'y', 'llo', 'z'))).toBe(true);
    });
    test('works for multibyte strings', () => {
        expect(ruby('céréale', s => s.endWith('réale'))).toBe(true);
    });
});
