module.exports = {
	extends: "stylelint-config-standard",

	plugins : [
		"./lib/rules/declaration-block-align-values.js",
		"stylelint-order"
	],

	rules: {
		"indentation"                     : "tab",
		"linebreaks"                      : "unix",
		"max-empty-lines"                 : 2,
		"no-empty-first-line"             : true,
		"no-missing-end-of-source-newline": true,
		"no-descending-specificity"       : null,		// disabled because it's too noisy and not enough value
		"declaration-empty-line-before"   : null,

		"at-rule-no-unknown": null,	// disabled because it keeps getting tripped up by LESS variables
		"declaration-block-no-duplicate-properties" : [ true, {
			"ignore" : [ "consecutive-duplicates" ]
		}],

		"declaration-colon-space-before"       : null,		// interferes with juuxstar/declaration-block-align-values
		"lcbapp/declaration-block-align-values": true,

		// enforce kebab-case for ids and class names
		"selector-class-pattern" : "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
		"selector-id-pattern"    : "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",

		"selector-pseudo-element-no-unknown" : [ true, {
			"ignorePseudoElements" : [ 'v-deep' ]
		}],

		"order/order": [
			"dollar-variables",
			"declarations",
			"custom-properties",
			"rules",
			"at-variables"
		],
		"order/properties-order": [
			[
				{
					"emptyLineBefore": "never",
					"properties": [
						"display",
						"position",
						"top",
						"right",
						"bottom",
						"left",
						"width",
						"max-width",
						"height",
						"max-height",
						"transform",
						"transition",
						//
						"margin",
						"margin-top",
						"margin-right",
						"margin-bottom",
						"margin-left",
						"padding",
						"padding-top",
						"padding-right",
						"padding-bottom",
						"padding-left",
						//
						"background",
						"background-image",
						"background-color",
						"color",
						//
						"border",
						"border-color",
						"border",
						"border-top",
						"border-right",
						"border-bottom",
						"border-left",
						"border-radius",
						"border-top-color",
						"border-right-color",
						"border-bottom-color",
						"border-left-color",
						//
						"font",
						"font-family",
						"font-size",
						"font-weight",
						"text-align",
						"vertical-align"
					]
				}
			],
			{
				"unspecified": "bottomAlphabetical",
				"emptyLineBeforeUnspecified": "never",
			}
		]
	}
}