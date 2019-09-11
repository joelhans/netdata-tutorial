const fs = require("fs");
const path = require("path");

exports.settings = {
  gfm: true,
  commonmark: true,
  looseTable: false,
  spacedTable: false,
  paddedTable: false,
  fences: true,
  rule: "-",
  ruleRepetition: 3,
  emphasis: "*",
  strong: "*",
  bullet: "-",
  listItemIndent: "tab",
  incrementListMarker: true
};

const personalDictionaryPath = path.join(__dirname, ".dictionary");
const personalDictionary = fs.existsSync(personalDictionaryPath)
  ? {
      personal: fs.readFileSync(personalDictionaryPath, "utf8")
    }
  : {};

const remarkPresetLintMarkdownStyleGuide = {
  plugins: require("remark-preset-lint-markdown-style-guide").plugins.filter(
    function(elem) {
      return elem != require("remark-lint-no-duplicate-headings");
    }
  )
};

exports.plugins = [
  require("remark-preset-lint-consistent"),
  require("remark-preset-lint-recommended"),
  remarkPresetLintMarkdownStyleGuide,
  [require("remark-lint-no-dead-urls"), { skipOffline: true }],
  require("remark-lint-heading-whitespace"),
  [require("remark-lint-maximum-line-length"), 120],
  [require("remark-lint-maximum-heading-length"), 120],
  [require("remark-lint-list-item-indent"), "tab-size"],
  [require("remark-lint-list-item-spacing"), false],
  [require("remark-lint-strong-marker"), "*"],
  [require("remark-lint-emphasis-marker"), "_"],
  [require("remark-lint-unordered-list-marker-style"), "-"],
  [require("remark-lint-ordered-list-marker-style"), "."],
  [require("remark-lint-ordered-list-marker-value"), "ordered"],
  require("remark-validate-links"),
  require("remark-frontmatter")
];
