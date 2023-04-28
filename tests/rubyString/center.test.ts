import ruby from "../../src/ruby";

describe('String#center', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_upcase
    test('String#center official tests', () => {
        expect(ruby('hello', s => s.center(4))).toBe('hello');
        expect(ruby('hello', s => s.center(11))).toBe('   hello   ');
        expect(ruby('', s => s.center(10, 'ab'))).toBe('ababaababa');
        expect(ruby('', s => s.center(11, 'ab'))).toBe('ababaababab');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/center_spec.rb
    test('returns a new string of specified length with self centered and padded with padstr', () => {
        expect(ruby('one', s => s.center(9, '.'))).toBe('...one...');
        expect(ruby('hello', s => s.center(20, '123'))).toBe('1231231hello12312312');
        expect(ruby('middle', s => s.center(13, '-'))).toBe('---middle----');

        expect(ruby('', s => s.center(1, 'abcd'))).toBe('a');
        expect(ruby('', s => s.center(2, 'abcd'))).toBe('aa');
        expect(ruby('', s => s.center(3, 'abcd'))).toBe('aab');
        expect(ruby('', s => s.center(4, 'abcd'))).toBe('abab');
        expect(ruby('', s => s.center(6, 'xy'))).toBe('xyxxyx');
        expect(ruby('', s => s.center(11, '12345'))).toBe('12345123451');

        expect(ruby('|', s => s.center(2, 'abcd'))).toBe('|a');
        expect(ruby('|', s => s.center(3, 'abcd'))).toBe('a|a');
        expect(ruby('|', s => s.center(4, 'abcd'))).toBe('a|ab');
        expect(ruby('|', s => s.center(5, 'abcd'))).toBe('ab|ab');
        expect(ruby('|', s => s.center(6, 'xy'))).toBe('xy|xyx');
        expect(ruby('|', s => s.center(7, 'xy'))).toBe('xyx|xyx');
        expect(ruby('|', s => s.center(11, '12345'))).toBe('12345|12345');
        expect(ruby('|', s => s.center(12, '12345'))).toBe('12345|123451');

        expect(ruby('||', s => s.center(3, 'abcd'))).toBe('||a');
        expect(ruby('||', s => s.center(4, 'abcd'))).toBe('a||a');
        expect(ruby('||', s => s.center(5, 'abcd'))).toBe('a||ab');
        expect(ruby('||', s => s.center(6, 'abcd'))).toBe('ab||ab');
        expect(ruby('||', s => s.center(8, 'xy'))).toBe('xyx||xyx');
        expect(ruby('||', s => s.center(12, '12345'))).toBe('12345||12345');
        expect(ruby('||', s => s.center(13, '12345'))).toBe('12345||123451');
    });
    test('pads with whitespace if no padstr is given', () => {
        expect(ruby('two', s => s.center(5))).toBe(' two ');
        expect(ruby('hello', s => s.center(20))).toBe('       hello        ');
    });
    test('returns self if it\'s longer than or as long as the specified length', () => {
        expect(ruby('', s => s.center(0))).toBe('');
        expect(ruby('', s => s.center(-1))).toBe('');
        expect(ruby('hello', s => s.center(4))).toBe('hello');
        expect(ruby('hello', s => s.center(-1))).toBe('hello');
        expect(ruby('this', s => s.center(3))).toBe('this');
        expect(ruby('radiology', s => s.center(8, '-'))).toBe('radiology');
    });
    test('calls parseInt to convert length to an integer', () => {
        expect(ruby('_', s => s.center(3.8, '^'))).toBe('^_^');
        const obj = '3'
        expect(parseInt(obj)).toBe(3);
        expect(ruby('_', s => s.center(obj, 'o'))).toBe('o_o');
    });
});
