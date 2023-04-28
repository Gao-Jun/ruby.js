import RubyObject from './rubyObject.js';
import RubyString from './rubyString.js';

type RubyType<T> = T extends string ? RubyString : never;

function ruby<T,V>(js: T, func: (rubyObj: RubyType<T>) => RubyObject<V>): V {
    if (typeof(js) === 'string'){
        const rubyObj = new RubyString(js) as RubyType<string>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return func(rubyObj as any).toJS();
    }
    throw new TypeError(`Cannot convert ${js} to Ruby type.`);
}

export default ruby;
