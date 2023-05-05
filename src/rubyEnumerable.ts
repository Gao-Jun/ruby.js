import RubyObject from './rubyObject.js';
import RubyBoolean from './rubyBoolean.js';
import RubyNil from "./rubyNil.js";

class RubyEnumerable<T> extends RubyObject<Iterable<T>> {
    each(func: (elm: T) => void | symbol): RubyEnumerable<T>|RubyNil{
        for (const elm of this.js) {
            const result = func(elm);
            if (result === Symbol('break')) {
                return new RubyNil();
            }
        }
        return this;
    }

    include(value: T): RubyBoolean {
        let result;
        this.each((elm) => {
            if (elm === value) {
                result = new RubyBoolean(true);
                return Symbol('break');
            }
        });
        if (!result) {
            result = new RubyBoolean(false);
        }
        return result;
    }

    isInclude = this.include;
    member = this.include;
    isMember = this.include;
}

export default RubyEnumerable;
