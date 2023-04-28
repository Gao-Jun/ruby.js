import RubyObject from './rubyObject.js';

class RubyString extends RubyObject<string> {
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
