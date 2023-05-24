import ruby from "../../src/ruby.js";

describe('String#tr', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_tr_s
    test('String#tr_s official tests', () => {
        expect(ruby('hello', s => s.trS('el', 'yp'))).toBe('hypo');
        expect(ruby('hello', s => s.trS('el', '*'))).toBe('h*o');
        expect(ruby('hello', s => s.tr_s('el', '*'))).toBe('h*o');
        expect(ruby('\u0101\u0101', s => s.trS('\u0101', 'a'))).toBe('a');
    });

    test('String#tr_s official doc', () => {
        expect(ruby('hello', s => s.trS('l', 'r'))).toBe('hero');
        expect(ruby('hello', s => s.trS('el', '-'))).toBe('h-o');
        expect(ruby('hello', s => s.trS('el', 'hx'))).toBe('hhxo');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/tr_s_spec.rb
    test('JRuby String#tr_s', () => {
        expect(ruby('hello', s => s.trS('o', '.'))).toBe('hell.');

        expect(ruby('hello', s => s.trS('a-y', 'b-z'))).toBe('ifmp');
        expect(ruby('123456789', s => s.trS('2-5', 'abcdefg'))).toBe('1abcd6789');
        expect(ruby('hello ^--^', s => s.trS('e-', '__'))).toBe('h_llo ^_^');
        expect(ruby('hello ^--^', s => s.trS('---', '_'))).toBe('hello ^_^');

        expect(ruby('this', s => s.trS('this', 'x'))).toBe('x');

        expect(ruby('hello', s => s.trS('^aeiou', '*'))).toBe('*e*o');
        expect(ruby('123456789', s => s.trS('^345', 'abc'))).toBe('c345c');
        expect(ruby('abcdefghijk', s => s.trS('^d-g', '9131'))).toBe('1defg1');

        expect(ruby('hello ^_^', s => s.trS('a-e^e', '.'))).toBe('h.llo ._.');
        expect(ruby('hello ^_^', s => s.trS('^^', '.'))).toBe('.^.^');
        expect(ruby('hello ^-^', s => s.trS('^-^', 'x'))).toBe('x^-^');
        expect(ruby('hello ^-^', s => s.trS('^^-^', 'x'))).toBe('x^x^');
        expect(ruby('hello ^-^', s => s.trS('^---', 'x'))).toBe('x-x');
        expect(ruby('hello ^-^', s => s.trS('^---l-o', 'x'))).toBe('xllox-x');

        expect(ruby('uber', s => s.trS('u', 'ü'))).toBe('über');
        expect(ruby('uuuber', s => s.trS('u', 'ü'))).toBe('über');
        expect(ruby('über', s => s.trS('ü', 'u'))).toBe('uber');
        expect(ruby('üüüber', s => s.trS('ü', 'u'))).toBe('uber');
    });
});
