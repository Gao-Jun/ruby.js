# Change Log

## 0.0.3 (2023-05-??)

- RubyString
  - ➕ `String#chop`
  - ➕ `String#chr`
  - ➕ `String#clear`
  - ➕ `String#codepoints`
  - ➕ `String#deletePrefix` / `String#delete_prefix`
  - ➕ `String#deleteSuffix` / `String#delete_suffix`
  - ➕ `String#count`

## 0.0.2 (2023-05-10)

Support almost all JS String methods.

- RubyString
  - ➕ `String#capitalize`
  - ➕ `String#casecmp`
  - ➕ `String#chars`
  - ➕ `String#chomp`
  - ➕ `String#concat`
  - ➕ `String#endWith` / `String#end_with` / `String#isEndWith`
  - ➕ `String#startWith` / `String#start_with` / `String#isStartWith`
  - ➕ `String#include` / `String#isInclude`
  - ➕ `String#lstrip`
  - ➕ `String#rstrip`
  - ➕ `String#strip`
  - ➕ `String#toS` / `String#to_s`
  - ➕ `String#toStr` / `String#to_str`
- Delegated to JS string
  - ➕ `length` (property)
  - ➕ `at`
  - ➕ `charAt` / `char_at`
  - ➕ `charCodeAt` / `char_code_at`
  - ➕ `codePointAt` / `code_point_at`
  - ➕ `concat` => `jsConcat` / `js_concat`
  - ➕ `endsWith` / `ends_with`
  - ➕ `fromCharCode` / `from_char_code`
  - ➕ `fromCodePoint` / `from_code_point`
  - ➕ `includes`
  - ➕ `indexOf` / `index_of`
  - ➕ `lastIndexOf` / `last_index_of`
  - ➕ `localeCompare` / `locale_compare`
  - ➕ `match` => `jsMatch` / `js_match`
  - ➕ `matchAll` / `match_all`
  - ➕ `normalize`
  - ➕ `padEnd` / `pad_end`
  - ➕ `padStart` / `pad_start`
  - ➕ `repeat`
  - ➕ `replace` => `jsReplace` / `js_replace`
  - ➕ `replaceAll` / `replace_all`
  - ➕ `search`
  - ➕ `slice` => `jsSlice` / `js_slice`
  - ➕ `split` => `jsSplit` / `js_split`
  - ➕ `startsWith` / `starts_with`
  - ➕ `substring`
  - ➕ `toLocaleLowerCase` / `to_locale_lower_case`
  - ➕ `toLocaleUpperCase` / `to_locale_upper_case`
  - ➕ `toLowerCase` / `to_lower_case`
  - ➕ `toString` / `to_string`
  - ➕ `toUpperCase` / `to_upper_case`
  - ➕ `trim`
  - ➕ `trimEnd` / `trim_end`
  - ➕ `trimStart` / `trim_start`
  - ➕ `valueOf` / `value_of`

## 0.0.1 (2023-04-28)

- Initial release.
- RubyString
  - ➕ `String#center`
  - ➕ `String#upcase`
