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

    test('String#padStart', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
        expect(ruby('5', s => s.padStart(2, '0'))).toBe('05');
        expect(ruby('5581', s => s.padStart(16, '*'))).toBe('************5581');
        expect(ruby('abc', s => s.padStart(10))).toBe('       abc');
        expect(ruby('abc', s => s.padStart(10))).toBe('       abc');
        expect(ruby('abc', s => s.padStart(10, 'foo'))).toBe('foofoofabc');
        expect(ruby('abc', s => s.padStart(8, '0'))).toBe('00000abc');
        expect(ruby('abc', s => s.padStart(1))).toBe('abc');
    });

    test('String#repeat', () => {
        expect(ruby('Happy! ', s => s.repeat(3))).toBe('Happy! Happy! Happy! ');
        expect(() => ruby('abc', s => s.repeat(-1))).toThrow(RangeError);
        expect(ruby('abc', s => s.repeat(0))).toBe('');
        expect(ruby('abc', s => s.repeat(1))).toBe('abc');
        expect(ruby('abc', s => s.repeat(2))).toBe('abcabc');
        expect(ruby('abc', s => s.repeat(3.5))).toBe('abcabcabc');
        expect(() => ruby('abc', s => s.repeat(1/0))).toThrow(RangeError);
    });

    test('String#replace renamed to jsReplace', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';
        expect(ruby(p, s => s.jsReplace('dog', 'monkey')))
            .toBe('The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?');
        expect(ruby(p, s => s.js_replace('dog', 'monkey')))
            .toBe('The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?');
        expect(ruby(p, s => s.jsReplace(/Dog/i, 'ferret')))
            .toBe('The quick brown fox jumps over the lazy ferret. If the dog reacted, was it really lazy?');
        expect(ruby('xxx', s => s.jsReplace('', '_'))).toBe('_xxx');
        expect(ruby('foo', s => s.jsReplace(/(f)/, '$2'))).toBe('$2oo');
        expect(ruby('foo', s => s.jsReplace('f', '$1'))).toBe('$1oo');
        expect(ruby('foo', s => s.jsReplace(/(f)|(g)/, '$2'))).toBe('oo');

        const replacer = (match:string, p1:string, p2:string, p3:string, offset:number, string:string) => [p1, p2, p3].join(' - ');
        expect(ruby('abc12345#$*%', s => s.jsReplace(/([^\d]*)(\d*)([^\w]*)/, replacer))).toBe('abc - 12345 - #$*%');

        const str = 'Twas the night before Xmas...';
        expect(ruby(str, s => s.jsReplace(/xmas/i, 'Christmas'))).toBe('Twas the night before Christmas...');

        expect(ruby('Apples are round, and apples are juicy.', s => s.jsReplace(/apples/gi, 'oranges')))
            .toBe('oranges are round, and oranges are juicy.');
        expect(ruby('Maria Cruz', s => s.jsReplace(/(\w+)\s(\w+)/, "$2, $1"))).toBe('Cruz, Maria');
        expect(ruby('abcd', s => s.jsReplace(/(bc)/, (match, p1, offset) => `${match} (${offset})`)))
            .toBe('abc (1)d');
    });

    test('String#replaceAll', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
        const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';
        expect(ruby(p, s => s.replaceAll('dog', 'monkey')))
            .toBe('The quick brown fox jumps over the lazy monkey. If the monkey reacted, was it really lazy?');
        expect(ruby(p, s => s.replaceAll(/Dog/ig, 'ferret')))
            .toBe('The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?');
        const report = 'A hacker called ha.*er used special characters in their name to breach the system.';
        expect(ruby(report, s => s.replaceAll('ha.*er', '[REDACTED]')))
            .toBe('A hacker called [REDACTED] used special characters in their name to breach the system.');
        expect(ruby('xxx', s => s.replaceAll('', '_'))).toBe('_x_x_x_');
        expect(ruby('aabbcc', s => s.replaceAll('b', '.'))).toBe('aa..cc');
        expect(ruby('aabbcc', s => s.replace_all('b', '.'))).toBe('aa..cc');
        expect(ruby('aabbcc', s => s.replaceAll(/b/g, '.'))).toBe('aa..cc');
    });

    test('String#search', () => {
        const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?'
        expect(ruby(paragraph, s => s.search(/[^\w\s]/g))).toBe(43);
        expect(ruby('hey JudE', s => s.search(/[A-Z]/))).toBe(4);
        expect(ruby('hey JudE', s => s.search(/[.]/))).toBe(-1);
    });

    test('String#slice renamed to jsSlice', () => {
        const str = 'The quick brown fox jumps over the lazy dog.';
        expect(ruby(str, s => s.jsSlice(31))).toBe('the lazy dog.');
        expect(ruby(str, s => s.jsSlice(4, 19))).toBe('quick brown fox');
        expect(ruby(str, s => s.js_slice(4, 19))).toBe('quick brown fox');
        expect(ruby(str, s => s.jsSlice(-4))).toBe('dog.');
        expect(ruby(str, s => s.jsSlice(-9, -5))).toBe('lazy');
        const str1 = 'The morning is upon us.';
        expect(ruby(str1, s => s.jsSlice(1, 8))).toBe('he morn');
        expect(ruby(str1, s => s.jsSlice(4, -2))).toBe('morning is upon u');
        expect(ruby(str1, s => s.jsSlice(12))).toBe('is upon us.');
        expect(ruby(str1, s => s.jsSlice(30))).toBe('');
        expect(ruby(str1, s => s.jsSlice(-3))).toBe('us.');
        expect(ruby(str1, s => s.jsSlice(-3, -1))).toBe('us');
        expect(ruby(str1, s => s.jsSlice(0, -1))).toBe('The morning is upon us');
        expect(ruby(str1, s => s.jsSlice(4, -1))).toBe('morning is upon us');
        expect(ruby(str1, s => s.jsSlice(-11, 16))).toBe('is u');
        expect(ruby(str1, s => s.jsSlice(-5, -1))).toBe('n us');
    });

    test('String#substring', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
        expect(ruby('Mozilla', s => s.substring(1, 3))).toBe('oz');
        expect(ruby('Mozilla', s => s.substring(2))).toBe('zilla');
        expect(ruby('Mozilla', s => s.substring(0, 1))).toBe('M');
        expect(ruby('Mozilla', s => s.substring(1, 0))).toBe('M');
        expect(ruby('Mozilla', s => s.substring(0, 6))).toBe('Mozill');
        expect(ruby('Mozilla', s => s.substring(4))).toBe('lla');
        expect(ruby('Mozilla', s => s.substring(4, 7))).toBe('lla');
        expect(ruby('Mozilla', s => s.substring(7, 4))).toBe('lla');
        expect(ruby('Mozilla', s => s.substring(0, 7))).toBe('Mozilla');
        expect(ruby('Mozilla', s => s.substring(0, 10))).toBe('Mozilla');
        expect(ruby('Mozilla', s => s.substring(-5, 2))).toBe('Mo');
        expect(ruby('Mozilla', s => s.substring(-5, -2))).toBe('');
    });

    test('String#toLocaleLowerCase', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase
        const dotted = 'İstanbul';
        expect(ruby(dotted, s => s.toLocaleLowerCase('en-US'))).toBe('i̇stanbul');
        expect(ruby(dotted, s => s.toLocaleLowerCase('tr'))).toBe('istanbul');
        expect(ruby('ALPHABET', s => s.toLocaleLowerCase())).toBe('alphabet');
        expect(ruby('ALPHABET', s => s.to_locale_lower_case())).toBe('alphabet');
        expect(ruby('\u0130', s => s.toLocaleLowerCase('tr'))).toBe('i');
        expect(ruby('\u0130', s => s.toLocaleLowerCase('en-US'))).not.toBe('i');
        const locales = ['tr', 'TR', 'tr-TR', 'tr-u-co-search', 'tr-x-turkish'];
        expect(ruby('\u0130', s => s.toLocaleLowerCase(locales))).toBe('i');
    });
});
