import ruby from "../../src/ruby.js"

describe('Delegated function to JS string', () => {
    test('String#at', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at
        const sentence = 'The quick brown fox jumps over the lazy dog.';
        expect(ruby(sentence, s => s.at(5))).toBe('u');
        expect(ruby(sentence, s => s.at(-4))).toBe('d');
        expect(ruby('myinvoice01', s => s.at(-1))).toBe('1');
        expect(ruby('myinvoice02', s => s.at(-1))).toBe('2');

        expect(ruby(sentence, s => s.at(100))).toBe(undefined);
    });

    test('String#charAt', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
        const sentence = 'The quick brown fox jumps over the lazy dog.';
        expect(ruby(sentence, s => s.charAt(4))).toBe('q');
        const anyString = 'Brave new world';
        expect(ruby(anyString, s => s.charAt())).toBe('B');
        expect(ruby(anyString, s => s.charAt(0))).toBe('B');
        expect(ruby(anyString, s => s.charAt(1))).toBe('r');
        expect(ruby(anyString, s => s.charAt(2))).toBe('a');
        expect(ruby(anyString, s => s.charAt(3))).toBe('v');
        expect(ruby(anyString, s => s.charAt(4))).toBe('e');
        expect(ruby(anyString, s => s.charAt(999))).toBe('');

        expect(ruby(sentence, s => s.char_at(4))).toBe('q');
    });
});
