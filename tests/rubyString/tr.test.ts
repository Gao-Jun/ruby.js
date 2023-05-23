import ruby from "../../src/ruby.js";

describe('String#tr', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_tr
    test('String#tr official tests', () => {
        expect(ruby('hello', s => s.tr('el', 'ip'))).toBe('hippo');
        expect(ruby('hello', s => s.tr('^aeiou', '*'))).toBe('*e**o');
        expect(ruby('ibm', s => s.tr('b-z', 'a-z'))).toBe('hal');
    });

    test('String#tr official doc', () => {
        expect(ruby('hello', s => s.tr('aeiou', '-'))).toBe('h-ll-');
        expect(ruby('hello', s => s.tr('aeiou', 'AA-'))).toBe('hAll-');
        expect(ruby('hello', s => s.tr('^aeiou', '-'))).toBe('-e--o');
        expect(ruby('hel^lo', s => s.tr('\\^aeiou', '-'))).toBe('h-l-l-');
        expect(ruby('i-b-m', s => s.tr('b\\-z', 'a-z'))).toBe('ibabm');
        expect(ruby('foo\\bar', s => s.tr('ab\\', 'XYZ'))).toBe('fooZYXr');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/tr_spec.rb
    test('JRuby String#tr', () => {
        expect(ruby('hello', s => s.tr('aeiou', '*'))).toBe('h*ll*');
        expect(ruby('Lisp', s => s.tr('Lisp', 'Ruby'))).toBe('Ruby');

        expect(ruby('hello', s => s.tr('a-y', 'b-z'))).toBe('ifmmp');
        expect(ruby('123456789', s => s.tr('2-5', 'abcdefg'))).toBe('1abcd6789');
        expect(ruby('hello ^-^', s => s.tr('e-', '__'))).toBe('h_llo ^_^');
        expect(ruby('hello ^-^', s => s.tr('---', '_'))).toBe('hello ^_^');

        expect(ruby('this', s => s.tr('this', 'x'))).toBe('xxxx');
        expect(ruby('hello', s => s.tr('a-z', 'A-H.'))).toBe('HE...');

        expect(() => ruby('hello', s => s.tr('a-y', 'z-b'))).toThrow(Error);
        expect(() => ruby('hello', s => s.tr('l-a', 'z'))).toThrow(Error);

        expect(ruby('123456789', s => s.tr('^345', 'abc'))).toBe('cc345cccc');
        expect(ruby('abcdefghijk', s => s.tr('^d-g', '9131'))).toBe('111defg1111');
        expect(ruby('hello ^_^', s => s.tr('a-e^e', '.'))).toBe('h.llo ._.');
        expect(ruby('hello ^_^', s => s.tr('^^', '.'))).toBe('......^.^');
        expect(ruby('hello ^_^', s => s.tr('^', 'x'))).toBe('hello x_x');
        expect(ruby('hello ^-^', s => s.tr('^-^', 'x'))).toBe('xxxxxx^-^');
        expect(ruby('hello ^-^', s => s.tr('^^-^', 'x'))).toBe('xxxxxx^x^');
        expect(ruby('hello ^-^', s => s.tr('^---', 'x'))).toBe('xxxxxxx-x');
        expect(ruby('hello ^-^', s => s.tr('^---l-o', 'x'))).toBe('xxlloxx-x');

        expect(ruby('hello', s => s.tr('helo', '1212'))).toBe('12112');

        const str = '椎名深夏';
        const a = '\u0080\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008E\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009E\u009F';
        const b = '€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ';
        expect(ruby(str, s => s.tr(a, b))).toBe('椎名深夏');
    });
});
