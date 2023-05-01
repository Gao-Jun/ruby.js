import RubyObject from './rubyObject.js';

class RubyNil extends RubyObject<null> {
    constructor() {
        super(null);
    }
}

export default RubyNil;
