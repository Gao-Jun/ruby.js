import ruby from "../../src/ruby.js";

describe('String#startWith', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_start_with?
    test('String#start_with? official tests', () => {
        expect(ruby('hello', s => s.startWith('hel'))).toBe(true);
        expect(ruby('hello', s => s.startWith('el'))).toBe(false);
        expect(ruby('hello', s => s.startWith('el', 'he'))).toBe(true);
        expect(ruby('hello', s => s.startWith(/hel/))).toBe(true);
        expect(ruby('hello', s => s.startWith(/el/))).toBe(false);

        expect(ruby('hello', s => s.start_with('hel'))).toBe(true);
        expect(ruby('hello', s => s.isStartWith('hel'))).toBe(true);
    });

    test('String#start_with? official doc sample', () => {
        expect(ruby('hello', s => s.startWith('hell'))).toBe(true);
        expect(ruby('hello', s => s.startWith(/H/i))).toBe(true);
        expect(ruby('hello', s => s.startWith('heaven', 'hell'))).toBe(true);
        expect(ruby('hello', s => s.start_with('heaven', 'paradise'))).toBe(false);
        expect(ruby('тест', s => s.start_with('т'))).toBe(true);
        expect(ruby('こんにちは', s => s.start_with('こ'))).toBe(true);
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/shared/string/start_with.rb
    test('returns true only if beginning match', () => {
        expect(ruby('hello', s => s.startWith('h'))).toBe(true);
        expect(ruby('hello', s => s.startWith('hel'))).toBe(true);
        expect(ruby('hello', s => s.startWith('el'))).toBe(false);
    });
    test('returns true only if any beginning match', () => {
        expect(ruby('hello', s => s.startWith('x', 'y', 'he', 'z'))).toBe(true);
    });
    test('returns true if the search string is empty', () => {
        expect(ruby('hello', s => s.startWith(''))).toBe(true);
        expect(ruby('', s => s.startWith(''))).toBe(true);
    });
    test('works for multibyte strings', () => {
        expect(ruby('céréale', s => s.startWith('cér'))).toBe(true);
    });
    test('supports regexps', () => {
        const regexp = /[h1]/;
        expect(ruby('hello', s => s.startWith(regexp))).toBe(true);
        expect(ruby('1337', s => s.startWith(regexp))).toBe(true);
        expect(ruby('foxes are 1337', s => s.startWith(regexp))).toBe(false);
        expect(ruby('chunky\n12bacon', s => s.startWith(/12/))).toBe(false);
    });
});
