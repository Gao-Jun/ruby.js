import RubyObject from './rubyObject.js';
import RubyNumber from "./rubyNumber.js";
import RubyArray from "./rubyArray.js";
import RubyUndefined from "./rubyUndefined.js";

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

    downcase():RubyString {
        this.js = this.js.toLowerCase();
        return this;
    }

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

}

export default RubyString;
