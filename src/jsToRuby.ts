import RubyBoolean from "./rubyBoolean.js";
import RubyNumber from "./rubyNumber.js";
import RubyString from "./rubyString.js";
import RubyUndefined from "./rubyUndefined.js";
import RubyArray from "./rubyArray.js";
import RubyNil from "./rubyNil.js";
import RubyEnumerable from "./rubyEnumerable.js";
import RubyObject from "./rubyObject.js";

/**
 * Convert js objects to corresponding RubyX class
 */
function jsToRuby<T>(js: T): RubyObject<T>;
function jsToRuby(js: boolean): RubyBoolean;
function jsToRuby(js: number): RubyNumber;
function jsToRuby(js: string): RubyString;
function jsToRuby(js: undefined): RubyUndefined;
function jsToRuby(js: null): RubyNil;
function jsToRuby<T>(js: Array<T>): RubyArray<T>;
function jsToRuby<T>(js: Iterable<T>): RubyEnumerable<T>;


function jsToRuby(js: any) {
    switch (typeof js) {
        case "boolean": return new RubyBoolean(js)
        case 'number': return new RubyNumber(js);
        case 'string': return new RubyString(js);
        case "undefined": return new RubyUndefined();
        case "object":
            if (js === null) return new RubyNil();
            if (Array.isArray(js)) return new RubyArray(js);
            if (Symbol.iterator in js) return new RubyEnumerable(js);
            return new RubyObject(js);
        default: throw `Unsupported type(${js})`
    }
}

export default jsToRuby;
