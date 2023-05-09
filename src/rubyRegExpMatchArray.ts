import RubyObject from "./rubyObject.js";
import RubyNumber from "./rubyNumber.js";
import RubyUndefined from "./rubyUndefined.js";
import RubyString from "./rubyString.js";

class RubyRegExpMatchArray extends RubyObject<RegExpMatchArray> {
    get index() {
        const result = this.js.index;
        return result === undefined ? new RubyUndefined() : new RubyNumber(result);
    }

    get input() {
        const result = this.js.input;
        return result === undefined ? new RubyUndefined() : new RubyString(result);
    }

    get groups() {
        const result = this.js.groups;
        return result === undefined ? new RubyUndefined() : new RubyObject(result);
    }
}

export default RubyRegExpMatchArray;
