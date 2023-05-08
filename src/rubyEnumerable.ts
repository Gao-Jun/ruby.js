import RubyObject from './rubyObject.js';
import RubyBoolean from './rubyBoolean.js';
import RubyNil from "./rubyNil.js";
import jsToRuby from "./jsToRuby.js";
import RubyString from "./rubyString.js";
import RubyNumber from "./rubyNumber.js";

class RubyEnumerable<T> extends RubyObject<Iterable<T>> {
    each(func: (elm: RubyString) => void | symbol): RubyEnumerable<string> | RubyNil;
    each(func: (elm: RubyNumber) => void | symbol): RubyEnumerable<number> | RubyNil;
    each(func: (elm: RubyBoolean) => void | symbol): RubyEnumerable<boolean> | RubyNil;
    each(func: any): RubyEnumerable<any>|RubyNil{
        for (const elm of this.js) {
            const result = func(jsToRuby(elm));
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
