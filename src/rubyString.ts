import RubyObject from './rubyObject.js';

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

    upcase():RubyString {
        this.js = this.js.toUpperCase();
        return this;
    }
}

export default RubyString;
