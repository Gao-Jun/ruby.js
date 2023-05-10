# ruby.js

## Still in development

Bring Ruby methods to JavaScript/TypeScript

### Sample
```javascript
import ruby from "ruby-ts";

ruby('foo', s => s.upcase().center(9)) // return ***FOO***
```

## String
### Task List
- [x] capitalize
- [x] casecmp
- [x] center
- [x] chars
- [x] chomp
- [x] chop
- [x] chr
- [x] clear
- [x] codepoints
- [x] concat
- [ ] count
- [ ] crypt
- [ ] delete
- [x] delete_prefix => deletePrefix
- [ ] delete_suffix => deleteSuffix
- [x] downcase
- [ ] dump
- [ ] each_char => eachChar
- [ ] each_codepoint => eachCodepoint
- [ ] each_line => eachLine
- [ ] empty? => empty / isEmpty
- [x] end_with? => end_with / endWith / isEndWith
- [ ] eql? => eql / isEql
- [ ] gsub
- [ ] hash
- [ ] hex
- [x] include? => include / isInclude
- [ ] index
- [ ] initialize_copy
- [ ] insert
- [ ] inspect
- [ ] length
- [ ] lines
- [ ] ljust
- [x] lstrip
- [ ] match
- [ ] match? => isMatch
- [ ] next
- [ ] oct
- [ ] ord
- [ ] partition
- [ ] prepend
- [ ] replace
- [ ] reverse
- [ ] rindex
- [ ] rjust
- [ ] rpartition
- [x] rstrip
- [ ] scan
- [ ] scrub
- [ ] size
- [ ] slice
- [ ] split
- [ ] squeeze
- [x] start_with? => start_with / startWith / isStartWith
- [x] strip
- [ ] sub
- [ ] succ
- [ ] sum
- [ ] swapcase
- [ ] to_c => toC
- [ ] to_f => toF
- [ ] to_i => toI
- [x] to_s => toS
- [x] to_str => toStr
- [ ] to_sym => toSym
- [ ] tr
- [ ] tr_s => trS
- [ ] undump
- [x] upcase
- [ ] upto

### Won't Implement
- ascii_only?
- b
- byteindex
- byterindex
- bytes
- bytesize
- byteslice
- bytesplice
- each_byte
- force_encoding
- freeze
- getbyte
- grapheme_clusters
- intern
- to_r
- unicode_normalize
- unicode_normalized?
- unpack
- unpack1
- validEncoding?

## Enumerable
- [x] each
- [x] include? => include / isInclude
- [x] member? => member / isMember