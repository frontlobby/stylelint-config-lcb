module.exports = {
	extends: "stylelint-config-standard",

	plugins : [
		"./lib/rules/declaration-block-align-values.js",
	],

	rules: {
		"indentation"        : "tab",
		"linebreaks"         : "unix",
		"max-empty-lines"    : 2,
		"no-empty-first-line": true,
		"no-missing-end-of-source-newline" : true,

		"at-rule-no-unknown": null,	// disabled because it keeps getting tripped up by LESS variables
		"declaration-block-no-duplicate-properties" : [ true, {
			ignore: [ "consecutive-duplicates" ]
		}],

		"declaration-colon-space-before" : null,		// interferes with juuxstar/declaration-block-align-values
		"lcbapp/declaration-block-align-values" : true
	}
}