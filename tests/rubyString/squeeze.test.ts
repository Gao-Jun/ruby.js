import ruby from "../../src/ruby.js";

describe('String#squeeze', () => {
    // https://github.com/ruby/ruby/blob/master/test/ruby/test_string.rb#test_squeeze
    test('String#squeeze official tests', () => {
        expect(ruby('aaabbbccc', s => s.squeeze())).toBe('abc');
        expect(ruby('aa   bb      cc', s => s.squeeze(' '))).toBe('aa bb cc');
        expect(ruby('BxxxTyyyWzzzzz', s => s.squeeze('a-z'))).toBe('BxTyWz');
    });

    test('String#squeeze official doc', () => {
        expect(ruby('yellow moon', s => s.squeeze())).toBe('yelow mon');
        expect(ruby('  now   is  the', s => s.squeeze(' '))).toBe(' now is the');
        expect(ruby('putters shoot balls', s => s.squeeze('m-z'))).toBe('puters shot balls');
    });

    // https://github.com/jruby/jruby/blob/master/spec/ruby/core/string/squeeze_spec.rb
    test('JRuby String#squeeze', () => {
        expect(ruby('woot squeeze cheese', s => s.squeeze('eost', 'queo'))).toBe('wot squeze chese');

        let str = '<<subbookkeeper!!!>>';
        expect(ruby(str, s => s.squeeze('beko', '^e'))).toBe(ruby(str, s => s.squeeze('bko')));
        expect(ruby(str, s => s.squeeze('^<bek!>'))).toBe(ruby(str, s => s.squeeze('o')));
        expect(ruby(str, s => s.squeeze('^o'))).toBe(ruby(str, s => s.squeeze('<bek!>')));
        expect(ruby(str, s => s.squeeze('^'))).toBe(str);
        expect(ruby('^__^', s => s.squeeze('^^'))).toBe('^_^');
        expect(ruby('((^^__^^))', s => s.squeeze('_^'))).toBe('((^_^))');

        str = '--subbookkeeper--';
        expect(ruby(str, s => s.squeeze('\x00-\xFF'))).toBe(ruby(str, s => s.squeeze()));
        expect(ruby(str, s => s.squeeze('bk-o'))).toBe(ruby(str, s => s.squeeze('bklmno')));
        expect(ruby(str, s => s.squeeze('b-e'))).toBe(ruby(str, s => s.squeeze('bcde')));
        expect(ruby(str, s => s.squeeze('e-'))).toBe('-subbookkeper-');
        expect(ruby(str, s => s.squeeze('-e'))).toBe('-subbookkeper-');
        expect(ruby(str, s => s.squeeze('---'))).toBe('-subbookkeeper-');
        expect(ruby('ook--001122', s => s.squeeze('--2'))).toBe('ook-012');
        expect(ruby('ook--(())', s => s.squeeze('(--'))).toBe('ook-()');
        expect(ruby(str, s => s.squeeze('^b-e'))).toBe('-subbokeeper-');
        expect(ruby('^^__^^', s => s.squeeze('^^-^'))).toBe('^^_^^');
        expect(ruby('^^--^^', s => s.squeeze('^---'))).toBe('^--^');
        expect(ruby(str, s => s.squeeze('b-dk-o-'))).toBe('-subokeeper-');
        expect(ruby(str, s => s.squeeze('-b-dk-o'))).toBe('-subokeeper-');
        expect(ruby(str, s => s.squeeze('b-d-k-o'))).toBe('-subokeeper-');
        expect(ruby(str, s => s.squeeze('bc-e'))).toBe('--subookkeper--');
        expect(ruby(str, s => s.squeeze('^bc-e'))).toBe('-subbokeeper-');
        expect(ruby('AABBCCaabbcc[[]]', s => s.squeeze('A-a'))).toBe('ABCabbcc[]');

        expect(() => ruby(str, s => s.squeeze('e-b'))).toThrow(Error);
        expect(() => ruby(str, s => s.squeeze('^e-b'))).toThrow(Error);
    });
});
