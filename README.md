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
- [ ] capitalize
- [ ] casecmp
- [x] center
- [ ] chars
- [ ] chomp
- [ ] chop
- [ ] chr
- [ ] clear
- [ ] codepoints
- [ ] concat
- [ ] count
- [ ] crypt
- [ ] delete
- [ ] delete_prefix => deletePrefix
- [ ] delete_suffix => deleteSuffix
- [ ] downcase
- [ ] dump
- [ ] each_char => eachChar
- [ ] each_codepoint => eachCodepoint
- [ ] each_line => eachLine
- [ ] empty? => empty / isEmpty
- [ ] end_with? => end_with / endWith / isEndWith
- [ ] eql? => eql / isEql
- [ ] gsub
- [ ] hash
- [ ] hex
- [ ] include? => include / isInclude
- [ ] index
- [ ] initialize_copy
- [ ] insert
- [ ] inspect
- [ ] length
- [ ] lines
- [ ] ljust
- [ ] lstrip
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
- [ ] rstrip
- [ ] scan
- [ ] scrub
- [ ] size
- [ ] slice
- [ ] split
- [ ] squeeze
- [ ] start_with? => start_with / startWith / isStartWith
- [ ] strip
- [ ] sub
- [ ] succ
- [ ] sum
- [ ] swapcase
- [ ] to_c => toC
- [ ] to_f => toF
- [ ] to_i => toI
- [ ] to_s => toS
- [ ] to_str => toStr
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