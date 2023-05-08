import RubyEnumerable from "./rubyEnumerable.js";
import RubyObject from "./rubyObject.js";
import RubyUndefined from "./rubyUndefined.js";

class RubyArray<T> extends RubyEnumerable<T> {
    protected js: Array<T>;

    constructor(jsArray: Array<T>) {
        super(jsArray);
        this.js = jsArray;
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
     */
    at(index: number): RubyObject<T | undefined> {
        const result = this.js.at(index);
        if (result === undefined) {
            return new RubyUndefined();
        } else {
            return new RubyObject<T>(result);
        }
    }
}

export default RubyArray;
