class CharacterSelectors {
    readonly negation: boolean = false;
    private parts: Array<number|[number, number]> = [];
    constructor(selector: string) {
        if (selector.startsWith('^')) {
            if (selector.length === 1) { // only '^' means '^'
                this.parts.push(94); // code point of '^' is 45
                return
            }
            this.negation = true;
            selector = selector.slice(1);
        }

        // if previous char is \\
        let escape = false;
        // if previous char is ^
        let range = false;
        // if a range is just end
        let justEndRange = false;
        [...selector].forEach((char, idx) => {
            const codePoint = char.codePointAt(0);
            if (codePoint === undefined) { // should not happened, char is always a string of length 1. Add for TypeScript
                throw new Error('Invalid character');
            }
            if (escape) {
                this.parts.push(codePoint);
                escape = false;
                justEndRange = false;
                return;
            }
            if (range) {
                const prev = this.parts.pop();
                if (prev === undefined || Array.isArray(prev)) {
                    throw new Error('Invalid range');
                }
                if (prev > codePoint) {
                    throw new Error('Range start should smaller than range end.');
                }
                this.parts.push([prev, codePoint]);
                range = false;
                justEndRange = true;
                return;
            }
            switch(char) {
                case '\\':
                    escape = true;
                    break;
                case '-':
                    // if '-' is at the beginning or the end of the selector, that means '-'
                    // justEndRange === true is used for case of the second '-' of 'b-d-k-o'
                    if (idx === 0 || idx === selector.length - 1 || justEndRange) {
                        this.parts.push(45); // code point of '-' is 45
                    } else {
                        range = true;
                    }
                    break;
                default:
                    this.parts.push(codePoint);
                    justEndRange = false;
            }
        });
        if (escape) {
            this.parts.push(92); // code point of '\' is 92
        }
    }

    match(char:string): boolean {
        const codePoint = char.codePointAt(0) || 0;
        const match = this.parts.some(part => {
            if (Array.isArray(part)) {
                return codePoint >= part[0] && codePoint <= part[1];
            } else {
                return codePoint === part;
            }
        });
        return this.negation ? !match : match;
    }

    *[Symbol.iterator]() {
        for(const part of this.parts) {
            if (Array.isArray(part)) {
                for (let i = part[0]; i <= part[1]; i++) {
                    yield String.fromCodePoint(i);
                }
            } else {
                yield String.fromCodePoint(part);
            }
        }
    }
}

export default CharacterSelectors;
