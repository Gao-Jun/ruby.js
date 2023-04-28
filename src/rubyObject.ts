class RubyObject<T> {
    protected js: T;
    constructor(jsObj: T) {
        this.js = jsObj;
    }

    toJS = (): T => this.js;
}

export default RubyObject;
