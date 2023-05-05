import RubyObject from './rubyObject.js';
import RubyNumber from "./rubyNumber.js";
import RubyArray from "./rubyArray.js";
import RubyUndefined from "./rubyUndefined.js";
import RubyBoolean from "./rubyBoolean.js";

class RubyString extends RubyObject<string> {
    /**
     * Returns a string containing the characters in self;
     * the first character is upcased; the remaining characters are downcased
     */
    capitalize():RubyString {
        if (this.js.length == 0) return this;
        let firstCharCap = this.js.charAt(0).toUpperCase();
        if (firstCharCap.length > 1) {
            firstCharCap = firstCharCap.charAt(0) + firstCharCap.slice(1).toLowerCase();
        }
        this.js = firstCharCap + this.js.slice(1).toLowerCase();
        return this;
    }

    /**
     * Compares self.downcase and other_string.downcase; returns:
     *
     * -1 if other_string.downcase is larger.
     * 0 if the two are equal.
     * 1 if other_string.downcase is smaller.
     * @param other The other string to compare with.
     */
    casecmp(other: string): RubyNumber {
        const thisLowerCase = this.js.toLowerCase();
        const otherLowerCase = other.toLowerCase();
        if (thisLowerCase === otherLowerCase) return new RubyNumber(0);
        return thisLowerCase < otherLowerCase ? new RubyNumber(-1) : new RubyNumber(1);
    }

    center(size:number|string, padString = ' '):RubyString {
        if (typeof(size) === 'string') {
            size = parseInt(size);
        }
        size = Math.floor(size);
        if (isNaN(size)){
            throw new TypeError(`Cannot convert ${size} to number.`);
        }
        if (size <= this.js.length) {
            this.js = this.js.slice();
            return this;
        }
        const padSize = size - this.js.length;
        const leftPadSize = Math.floor(padSize / 2);
        this.js = this.js.padStart(leftPadSize + this.js.length, padString).padEnd(size, padString);
        return this;
    }

    chars(func: (elm: string) => void):RubyString;
    chars(): RubyArray<string>
    chars(func: ((elm: string) => void)|null = null):RubyArray<string>|RubyString {
        const rubyArray = new RubyArray<string>([...this.js]);
        if (!func) {
            return rubyArray;
        }
        rubyArray.each(func);
        return this;
    }

    /**
     * Concatenates each object in objects to self and returns self:
     * For each given object object that is an Integer, the value is considered a codepoint and converted to a
     * character before concatenation:
     * @param strings
     */
    concat(...strings: Array<string|number>):RubyString {
        strings = strings.map(element => {
            if (typeof(element) === 'number') {
                element = String.fromCharCode(element);
            }
            return element;
        })
        this.js += strings.join('');
        return this;
    }

    downcase():RubyString {
        this.js = this.js.toLowerCase();
        return this;
    }

    /**
     * Returns whether self ends with any of the given strings.
     * Returns true if any given string matches the end, false otherwise:
     */
    endWith(...strings: Array<string>): RubyBoolean {
        const result = strings.some(str => this.js.endsWith(str));
        return new RubyBoolean(result);
    }
    end_with = this.endWith;
    isEndWith = this.endWith;

    include(otherString:string):RubyBoolean {
        const result = this.js.includes(otherString);
        return new RubyBoolean(result);
    }
    isInclude = this.include;

    /**
     * Returns whether self starts with any of the given string_or_regexp.
     * Matches patterns against the beginning of self
     * @return true if any pattern matches the beginning, false otherwise
     */
    startWith(...stringOrRegExps: Array<string|RegExp>): RubyBoolean {
        const result = stringOrRegExps.some(stringOrRegExp => {
            if (typeof(stringOrRegExp) === 'string') {
                return this.js.startsWith(stringOrRegExp);
            } else { // RegExp, add ^ to the beginning
                const startRegExp = new RegExp(`^${stringOrRegExp.source}`, stringOrRegExp.flags);
                return startRegExp.test(this.js);
            }
        });
        return new RubyBoolean(result);
    }
    start_with = this.startWith;
    isStartWith = this.startWith;

    upcase():RubyString {
        this.js = this.js.toUpperCase();
        return this;
    }

    // delegate method to string
    at(index:number):RubyString|RubyObject<undefined> {
        const result = this.js.at(index);
        if (result === undefined) {
            return new RubyUndefined;
        } else {
            return new RubyString(result);
        }
    }

    charAt(index = 0):RubyString {
        const result = this.js.charAt(index);
        return new RubyString(result);
    }
    char_at = this.charAt;

    charCodeAt(index = 0):RubyNumber {
        const result = this.js.charCodeAt(index);
        return new RubyNumber(result);
    }
    char_code_at = this.charCodeAt;

    codePointAt(pos:number):RubyNumber|RubyUndefined {
        const result = this.js.codePointAt(pos);
        if (result === undefined) {
            return new RubyUndefined;
        } else {
            return new RubyNumber(result);
        }
    }
    code_point_at = this.codePointAt;

    /**
     * This method lets you determine whether or not a string includes another string.
     * @param searchString A string to be searched for within str. Cannot be a regex. All values that are not regexes
     *  are coerced to strings, so omitting it or passing undefined causes includes() to search for the string
     *  "undefined", which is rarely what you want.
     * @param position The position within the string at which to begin searching for searchString. (Defaults to 0.)
     */
    includes(searchString:string, position = 0):RubyBoolean {
        const result = this.js.includes(searchString, position);
        return new RubyBoolean(result);
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
     */
    indexOf(searchString:string, position = 0):RubyNumber {
        const result = this.js.indexOf(searchString, position);
        return new RubyNumber(result);
    }
    index_of = this.indexOf;

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
     */
    localeCompare(compareString:string, locales?: string, options?: Intl.CollatorOptions):RubyNumber {
        const result = this.js.localeCompare(compareString, locales, options);
        return new RubyNumber(result);
    }
    locale_compare = this.localeCompare;

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
     */
    normalize(form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'):RubyString {
        const result = this.js.normalize(form);
        return new RubyString(result);
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
     */
    padEnd(targetLength: number, padString?: string): RubyString {
        const result = this.js.padEnd(targetLength, padString);
        return new RubyString(result);
    }
    pad_end = this.padEnd;

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
     */
    padStart(targetLength: number, padString?: string): RubyString {
        const result = this.js.padStart(targetLength, padString);
        return new RubyString(result);
    }
    pad_start = this.padStart;

    // static delegation methods

    /**
     * static method returns a string created from the specified sequence of UTF-16 code units.
     */
    static fromCharCode(...charCodes: Array<number>):RubyString {
        const result = String.fromCharCode(...charCodes);
        return new RubyString(result);
    }
    static from_char_code = this.fromCharCode;

    /**
     * static method returns a string created by using the specified sequence of code points.
     */
    static fromCodePoint(...codePoints: Array<number>):RubyString {
        const result = String.fromCodePoint(...codePoints);
        return new RubyString(result);
    }
    static from_code_point = this.fromCodePoint;
}

export default RubyString;
