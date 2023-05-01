import RubyObject from './rubyObject.js';
import RubyString from './rubyString.js';
import RubyEnumerable from './rubyEnumerable.js';

type RubyType<T> = T extends string ? RubyString :
                   T extends Iterable<any> ? RubyEnumerable : never;

function ruby<T,V>(js: T, func: (rubyObj: RubyType<T>) => RubyObject<V>): V {
    if (typeof(js) === 'string'){
        const rubyObj = new RubyString(js);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return func(rubyObj as any).toJS();
    } else if (js !== null && js !== undefined && typeof((js as any)[Symbol.iterator]) === 'function') {
        const rubyObj = new RubyEnumerable(js as any);
        return func(rubyObj as any).toJS();
    }
    throw new TypeError(`Cannot convert ${js} to Ruby type.`);
}

export default ruby;
