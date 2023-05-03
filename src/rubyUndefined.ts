import RubyObject from './rubyObject.js';

class RubyUndefined extends RubyObject<undefined> {
    constructor() {
        super(undefined);
    }
}

export default RubyUndefined;
