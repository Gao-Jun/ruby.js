import ruby from "../../src/ruby.js";

describe('String#count', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_count
    test('String#count official tests', () => {
        const a = 'hello world';
        expect(ruby(a, s => s.count('lo'))).toBe(5);
        expect(ruby(a, s => s.count('lo', 'o'))).toBe(2);
        expect(ruby(a, s => s.count('hello', '^l'))).toBe(4);
        expect(ruby(a, s => s.count('ej-m'))).toBe(4);
        expect(ruby('y', s => s.count('a\\-z'))).toBe(0);
        const a2 = "abc\u3042\u3044\u3046";
        expect(ruby(a2, s => s.count('^a'))).toBe(5);
        expect(ruby(a2, s => s.count('\u3042'))).toBe(1);
        expect(ruby(a2, s => s.count('^\u3042'))).toBe(5);
        expect(ruby(a2, s => s.count('a-z', '^a'))).toBe(2);
        expect(ruby(a2, s => s.count('a', '\u3042'))).toBe(0);
        expect(ruby(a2, s => s.count('\u3042', 'a'))).toBe(0);
        expect(ruby(a2, s => s.count('\u3042', '\u3044'))).toBe(0);
        expect(ruby(a2, s => s.count('^a', '^\u3044'))).toBe(4);
        expect(ruby(a2, s => s.count('^\u3044', '^a'))).toBe(4);
        expect(ruby(a2, s => s.count('^\u3042', '^\u3044'))).toBe(4);
    });

    test('String#count official doc', () => {
        expect(ruby('hello^world', s => s.count('\\^aeiou'))).toBe(4);
        expect(ruby('hello-world', s => s.count('a\\-eo'))).toBe(4);
        const c = 'hello world\\r\\n';
        expect(ruby(c, s => s.count('\\'))).toBe(2);
        expect(ruby(c, s => s.count('\\A'))).toBe(0);
        expect(ruby(c, s => s.count('X-\\w'))).toBe(3);
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/count_spec.rb
    test('JRuby String#count', () => {
        let str = 'hello\nworld\x00\x00';
        expect(ruby(str, s => s.count(str))).toBe(str.length);
        expect(ruby(str, s => s.count('lo'))).toBe(5);
        expect(ruby(str, s => s.count('eo'))).toBe(3);
        expect(ruby(str, s => s.count('l'))).toBe(3);
        expect(ruby(str, s => s.count('\n'))).toBe(1);
        expect(ruby(str, s => s.count('\x00'))).toBe(2);
        expect(ruby(str, s => s.count(''))).toBe(0);
        expect(ruby('', s => s.count(''))).toBe(0);
        expect(ruby(str, s => s.count('l', 'lo'))).toBe(ruby(str, s => s.count('l')));
        expect(ruby(str, s => s.count('l', 'lo', 'o'))).toBe(ruby(str, s => s.count('')));
        expect(ruby(str, s => s.count('helo', 'hel', 'h'))).toBe(ruby(str, s => s.count('h')));
        expect(ruby(str, s => s.count('helo', '', 'x'))).toBe(0);

        expect(() => ruby(str, s => s.count())).toThrow(Error);

        str = '^hello\nworld\x00\x00';
        expect(ruby(str, s => s.count('^'))).toBe(1);
        expect(ruby(str, s => s.count('^leh'))).toBe(9);
        expect(ruby(str, s => s.count('^o'))).toBe(12);
        expect(ruby(str, s => s.count('helo', '^el'))).toBe(ruby(str, s => s.count('ho')));
        expect(ruby(str, s => s.count('aeiou', '^e'))).toBe(ruby(str, s => s.count('aiou')));
        expect(ruby('^_^', s => s.count('^^'))).toBe(1);
        expect(ruby('oa^_^o', s => s.count('a^'))).toBe(3);

        str = 'hel-[()]-lo012^';
        expect(ruby(str, s => s.count('\x00-\xFF'))).toBe(str.length);
        expect(ruby(str, s => s.count('ej-m'))).toBe(3);
        expect(ruby(str, s => s.count('e-h'))).toBe(2);
        expect(ruby(str, s => s.count('-'))).toBe(2);
        expect(ruby(str, s => s.count('e-'))).toBe(ruby(str, s => s.count('e')) + ruby(str, s => s.count('-')));
        expect(ruby(str, s => s.count('-h'))).toBe(ruby(str, s => s.count('h')) + ruby(str, s => s.count('-')));
        expect(ruby(str, s => s.count('---'))).toBe(ruby(str, s => s.count('-')));
        expect(ruby(str, s => s.count('--2'))).toBe(ruby(str, s => s.count('-./012')));
        expect(ruby(str, s => s.count('(--'))).toBe(ruby(str, s => s.count('()*+,-')));
        expect(ruby(str, s => s.count('A-a'))).toBe(ruby(str, s => s.count('A-Z[\\]^_`a')));
        expect(ruby(str, s => s.count('^e-h'))).toBe(str.length - ruby(str, s => s.count('e-h')));
        expect(ruby(str, s => s.count('^^-^'))).toBe(str.length - ruby(str, s => s.count('^')));
        expect(ruby(str, s => s.count('^---'))).toBe(str.length - ruby(str, s => s.count('-')));
        expect(ruby('abcdefgh', s => s.count('a-ce-fh'))).toBe(6);
        expect(ruby('abcdefgh', s => s.count('he-fa-c'))).toBe(6);
        expect(ruby('abcdefgh', s => s.count('e-fha-c'))).toBe(6);
        expect(ruby('abcde', s => s.count('ac-e'))).toBe(4);
        expect(ruby('abcde', s => s.count('^ac-e'))).toBe(1);

        expect(() => ruby(str, s => s.count('h-e'))).toThrow(Error);
        expect(() => ruby(str, s => s.count('……h-e'))).toThrow(Error);

        str = '\u2605';
        expect(ruby(str, s => s.count(str))).toBe(1);
        expect(ruby(`asd${str}zzz${str}ggg`, s => s.count(str))).toBe(2);
    });
});
