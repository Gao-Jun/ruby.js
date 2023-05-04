import ruby from "../../src/ruby.js"
import RubyString from "../../src/rubyString.js";

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

    test('String#charCodeAt', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
        const sentence = 'The quick brown fox jumps over the lazy dog.';
        expect(ruby(sentence, s => s.charCodeAt(4))).toBe(113);
        expect(ruby('ABC', s => s.charCodeAt(0))).toBe(65);

        expect(ruby(sentence, s => s.charCodeAt(100))).toBe(NaN);
        expect(ruby(sentence, s => s.char_code_at(4))).toBe(113);
    });

    test('String#codePointAt', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
        const icons = '☃★♲';
        expect(ruby(icons, s => s.codePointAt(1))).toBe(9733);
        expect(ruby('ABC', s => s.codePointAt(0))).toBe(65);
        expect(ruby('😍', s => s.codePointAt(0))).toBe(128525);
        expect(ruby('\ud83d\ude0d', s => s.codePointAt(0))).toBe(128525);
        expect(ruby('😍', s => s.codePointAt(1))).toBe(56845);
        expect(ruby('\ud83d\ude0d', s => s.codePointAt(1))).toBe(56845);
        expect(ruby('ABC', s => s.codePointAt(42))).toBe(undefined);

        expect(ruby(icons, s => s.code_point_at(1))).toBe(9733);
    });

    // static methods
    test('String.fromCharCode', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
        expect(ruby(() => RubyString.fromCharCode(189, 43, 190, 61))).toBe('½+¾=');
        expect(ruby(() => RubyString.fromCharCode(65, 66, 67))).toBe('ABC');
        expect(ruby(() => RubyString.fromCharCode(0x2014))).toBe('—');
        expect(ruby(() => RubyString.fromCharCode(0x12014))).toBe('—');
        expect(ruby(() => RubyString.fromCharCode(0xd83c, 0xdf03))).toBe('\uD83C\uDF03'); // Code Point U+1F303 "Night with Stars" === "\uD83C\uDF03"
        expect(ruby(() => RubyString.fromCharCode(55356, 57091))).toBe('\uD83C\uDF03');
        expect(ruby(() => RubyString.fromCharCode(0xd834, 0xdf06, 0x61, 0xd834, 0xdf07))).toBe('\uD834\uDF06a\uD834\uDF07');

        expect(ruby(() => RubyString.from_char_code(189, 43, 190, 61))).toBe('½+¾=');
    });

    test('String.fromCodePoint', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
        expect(ruby(() => RubyString.fromCodePoint(9731, 9733, 9842, 0x2f804))).toBe('☃★♲你');
        expect(ruby(() => RubyString.fromCodePoint(42))).toBe('*');
        expect(ruby(() => RubyString.fromCodePoint(65, 90))).toBe('AZ');
        expect(ruby(() => RubyString.fromCodePoint(0x404))).toBe('Є');
        expect(ruby(() => RubyString.fromCodePoint(0x2f804))).toBe('你');
        expect(ruby(() => RubyString.fromCodePoint(194564))).toBe('\uD87E\uDC04');
        expect(ruby(() => RubyString.fromCodePoint(0x1d306, 0x61, 0x1d307))).toBe('\uD834\uDF06a\uD834\uDF07');
        expect(ruby(() => RubyString.fromCodePoint(0xd83c, 0xdf03))).toBe('\uD83C\uDF03'); // Code Point U+1F303 "Night with Stars" === "\uD83C\uDF03"
        expect(ruby(() => RubyString.fromCodePoint(55356, 57091))).toBe('\uD83C\uDF03');
    });
});
