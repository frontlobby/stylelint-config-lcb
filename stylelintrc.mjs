export default {
	extends : "stylelint-config-standard-scss",

	plugins : [
		"./lib/rules/declaration-block-align-values.mjs",
	],

	rules : {
		"scss/dollar-variable-colon-space-before" : null,	// disable the original rule to avoid conflicts with the next rule
		"frontlobby/declaration-block-align-values" : true,

		"scss/dollar-variable-empty-line-before" : null,	// should allow empty lines above variable declarations (don't see why not)
	}
}