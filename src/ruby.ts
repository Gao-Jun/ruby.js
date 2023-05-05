import RubyObject from './rubyObject.js';
import RubyString from './rubyString.js';
import RubyEnumerable from './rubyEnumerable.js';
import RubyArray from "./rubyArray.js";

function ruby<V>(js: string, func: (rubyObj: RubyString) => RubyObject<V>): V;
function ruby<T, V>(js: Array<T>, func: (rubyObj: RubyArray<T>) => RubyObject<V>): V;
function ruby<T, V>(js: Iterable<T>, func: (rubyObj: RubyEnumerable<T>) => RubyObject<V>): V;
function ruby<V>(func: () => RubyObject<V>): V;

function ruby<V>(js_or_func: any, func?: (rubyObj?: any) => RubyObject<V>): V {
    if (typeof(js_or_func) === 'function') {
        return js_or_func().toJS();
    }
    const js = js_or_func;
    let rubyObj = null;
    if (typeof(js) === 'string'){
        rubyObj = new RubyString(js);
    } else if (Array.isArray(js)) {
        rubyObj = new RubyArray(js);
    } else if (js !== null && js !== undefined && typeof((js as any)[Symbol.iterator]) === 'function') {
        rubyObj = new RubyEnumerable(js);
    }

    if (rubyObj && func) {
        return func(rubyObj).toJS();
    } else {
        throw new TypeError(`Cannot convert ${js} to Ruby type.`);
    }
}

export default ruby;
