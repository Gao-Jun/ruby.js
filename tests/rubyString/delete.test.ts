import ruby from "../../src/ruby.js";

describe('String#delete', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_delete
    test('String#delete official tests', () => {
        expect(ruby('hello', s => s.delete('l', 'lo'))).toBe('heo');
        expect(ruby('hello', s => s.delete('lo'))).toBe('he');
        expect(ruby('hello', s => s.delete('aeiou', '^e'))).toBe('hell');
        expect(ruby('hello', s => s.delete('ej-m'))).toBe('ho');

        expect(ruby('a\u0101', s => s.delete('\u0101'))).toBe('a');
        expect(ruby('abc\u3042\u3044\u3046', s => s.delete('^a'))).toBe('a');
        expect(ruby('abc\u3042\u3044\u3046', s => s.delete('a')))
            .toBe('bc\u3042\u3044\u3046');
        expect(ruby('abc\u3042\u3044\u3046', s => s.delete('^\u3042'))).toBe('\u3042');

        expect(ruby('\\', s => s.delete('\\'))).toBe('');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/delete_spec.rb
    test('JRuby String#delete', () => {
        expect(ruby('hell yeah', s => s.delete(''))).toBe('hell yeah');

        expect(ruby('hello', s => s.delete('aeiou', '^e'))).toBe('hell');
        expect(ruby('hello', s => s.delete('^leh'))).toBe('hell');
        expect(ruby('hello', s => s.delete('^o'))).toBe('o');
        expect(ruby('hello', s => s.delete('^'))).toBe('hello');
        expect(ruby('^_^', s => s.delete('^^'))).toBe('^^');
        expect(ruby('oa^_^o', s => s.delete('a^'))).toBe('o_o');

        expect(ruby('hello', s => s.delete('ej-m'))).toBe('ho');
        expect(ruby('hello', s => s.delete('e-h'))).toBe('llo');
        expect(ruby('hel-lo', s => s.delete('e-'))).toBe('hllo');
        expect(ruby('hel-lo', s => s.delete('-h'))).toBe('ello');
        expect(ruby('hel-lo', s => s.delete('---'))).toBe('hello');
        expect(ruby('hel-012', s => s.delete('--2'))).toBe('hel');
        expect(ruby('hel-()', s => s.delete('(--'))).toBe('hel');
        expect(ruby('hello', s => s.delete('^e-h'))).toBe('he');
        expect(ruby('hello^', s => s.delete('^^-^'))).toBe('^');
        expect(ruby('hel--lo', s => s.delete('^---'))).toBe('--');

        expect(ruby('abcdefgh', s => s.delete('a-ce-fh'))).toBe('dg');
        expect(ruby('abcdefgh', s => s.delete('he-fa-c'))).toBe('dg');
        expect(ruby('abcdefgh', s => s.delete('e-fha-c'))).toBe('dg');

        expect(ruby('abcde', s => s.delete('ac-e'))).toBe('b');
        expect(ruby('abcde', s => s.delete('^ac-e'))).toBe('acde');
        expect(ruby('ABCabc[]', s => s.delete('A-a'))).toBe('bc');

        expect(ruby('四月', s => s.delete('月'))).toBe('四');
        expect(ruby('哥哥我倒', s => s.delete('哥'))).toBe('我倒');

        // slightly difference between JavaScript and Ruby
        // in JavaScript '\-' == '-', but in Ruby '\-' == '\-'
        expect(ruby('Non-Authoritative Information', s => s.delete(' \\-\'')))
            .toBe('NonAuthoritativeInformation');

        expect(() => ruby('hello', s => s.delete('h-e'))).toThrow(Error);
        expect(() => ruby('hello', s => s.delete('^h-e'))).toThrow(Error);
    });
});
