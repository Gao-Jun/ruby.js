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

    test('String#includes', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
        const sentence = 'The quick brown fox jumps over the lazy dog.';
        expect(ruby(sentence, s => s.includes('fox'))).toBe(true);
        const str = "To be, or not to be, that is the question.";
        expect(ruby(str, s => s.includes('To be'))).toBe(true);
        expect(ruby(str, s => s.includes('question'))).toBe(true);
        expect(ruby(str, s => s.includes('nonexistent'))).toBe(false);
        expect(ruby(str, s => s.includes('To be', 1))).toBe(false);
        expect(ruby(str, s => s.includes('TO BE'))).toBe(false);
        expect(ruby(str, s => s.includes(''))).toBe(true);
    });

    test('String#indexOf', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
        const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';
        const indexOfFirst = ruby(paragraph, s => s.indexOf('dog'));
        expect(indexOfFirst).toBe(40);
        expect(ruby(paragraph, s => s.indexOf('dog', indexOfFirst + 1))).toBe(52);
        expect(ruby('hello world', s => s.indexOf(''))).toBe(0);
        expect(ruby('hello world', s => s.indexOf('', 0))).toBe(0);
        expect(ruby('hello world', s => s.indexOf('', 3))).toBe(3);
        expect(ruby('hello world', s => s.indexOf('', 8))).toBe(8);
        expect(ruby('hello world', s => s.indexOf('', 11))).toBe(11);
        expect(ruby('hello world', s => s.indexOf('', 13))).toBe(11);
        expect(ruby('hello world', s => s.indexOf('', 22))).toBe(11);
        expect(ruby('Blue Whale', s => s.indexOf('Blue'))).toBe(0);
        expect(ruby('Blue Whale', s => s.indexOf('Blut'))).toBe(-1);
        expect(ruby('Blue Whale', s => s.indexOf('Whale', 0))).toBe(5);
        expect(ruby('Blue Whale', s => s.indexOf('Whale', 5))).toBe(5);
        expect(ruby('Blue Whale', s => s.indexOf('Whale', 7))).toBe(-1);
        expect(ruby('Blue Whale', s => s.indexOf(''))).toBe(0);
        expect(ruby('Blue Whale', s => s.indexOf('', 9))).toBe(9);
        expect(ruby('Blue Whale', s => s.indexOf('', 10))).toBe(10);
        expect(ruby('Blue Whale', s => s.indexOf('', 11))).toBe(10);
        expect(ruby('Blue Whale', s => s.indexOf('blue'))).toBe(-1);
        expect(ruby('Brave new world', s => s.indexOf('w'))).toBe(8);
        expect(ruby('Brave new world', s => s.indexOf('new'))).toBe(6);
        expect(ruby('brie, pepper jack, cheddar', s => s.indexOf('cheddar'))).toBe(19);
        expect(ruby('Brie, Pepper Jack, Cheddar', s => s.indexOf('cheddar'))).toBe(-1);

        expect(ruby('brie, pepper jack, cheddar', s => s.index_of('cheddar'))).toBe(19);
    });

    test('String#localeCompare', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
        const a = 'réservé'; // With accents, lowercase
        const b = 'RESERVE'; // No accents, uppercase
        expect(ruby(a, s => s.localeCompare(b, 'en'))).toBe(1);
        expect(ruby(a, s => s.localeCompare(b, 'en', { sensitivity: 'base' }))).toBe(0);
        expect(ruby(a, s => s.locale_compare(b, 'en', { sensitivity: 'base' }))).toBe(0);
        expect(ruby('a', s => s.localeCompare('c'))).toBeLessThan(0);
        expect(ruby('check', s => s.localeCompare('against'))).toBeGreaterThan(0);
        expect(ruby('a', s => s.localeCompare('a'))).toBe(0);
        expect(ruby('ä', s => s.localeCompare('z', 'de'))).toBeLessThan(0);
        expect(ruby('ä', s => s.localeCompare('z', 'sv'))).toBeGreaterThan(0);
        expect(ruby('ä', s => s.localeCompare('a', 'de', { sensitivity: 'base' }))).toBe(0);
        expect(ruby('ä', s => s.localeCompare('a', 'sv', { sensitivity: 'base' }))).toBeGreaterThan(0);
    });

    test('String#normalize', () => {
        const name1 = '\u0041\u006d\u00e9\u006c\u0069\u0065';
        const name2 = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';
        expect(ruby(name1, s => s.normalize('NFC'))).toBe(name2.normalize('NFC'));
        expect(ruby('\u00F1', s => s.normalize('NFC'))).toBe('ñ');
        expect(ruby('\u006E\u0303', s => s.normalize('NFC'))).toBe('ñ');
        expect(ruby('\u00F1', s => s.normalize('NFD'))).toBe('\u006E\u0303'.normalize('NFD'));
        expect(ruby('\uFB00', s => s.normalize('NFKD'))).toBe('ff');
        const str = '\u1E9B\u0323';
        expect(ruby(str, s => s.normalize('NFC'))).toBe('\u1E9B\u0323');
        expect(ruby(str, s => s.normalize())).toBe('\u1E9B\u0323');
        expect(ruby(str, s => s.normalize('NFD'))).toBe('\u017F\u0323\u0307');
        expect(ruby(str, s => s.normalize('NFKC'))).toBe('\u1E69');
        expect(ruby(str, s => s.normalize('NFKD'))).toBe('\u0073\u0323\u0307');
    });

    test('String#padEnd', () => {
        expect(ruby('Breaded Mushrooms', s => s.padEnd(25, '.'))).toBe('Breaded Mushrooms........');
        expect(ruby('200', s => s.padEnd(5))).toBe('200  ');
        expect(ruby('abc', s => s.padEnd(10))).toBe('abc       ');
        expect(ruby('abc', s => s.padEnd(10, 'foo'))).toBe('abcfoofoof');
        expect(ruby('abc', s => s.pad_end(10, 'foo'))).toBe('abcfoofoof');
        expect(ruby('abc', s => s.padEnd(6, '123456'))).toBe('abc123');
        expect(ruby('abc', s => s.padEnd(1))).toBe('abc');
    });
});
