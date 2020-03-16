const stylelint = require('stylelint');

const ruleName = 'lcbapp/declaration-block-align-values';
const messages =  stylelint.utils.ruleMessages(ruleName, {
	expected : () => 'Property values are not aligned',
});

module.exports = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptionObject, context) {
	return function(root, result) {

		const validOptions = stylelint.utils.validateOptions(result, ruleName, { });
		if (!validOptions) {
			return;
		}

		root.walkRules(rule => {
			let declarationBlock = [];
			rule.each(node => {
				if (node.type === 'comment') {
					return;	// ignore comments in and around declarations
				}
				if (node.type === 'decl') {
					declarationBlock.push(node);
				}

				if (declarationBlock.length > 0 && (node.type !== 'decl' || !node.next())) {
					let maxPropLength = Math.max(...declarationBlock.map(node => node.prop.length));

					if (context.fix) {
						declarationBlock.forEach(decl => {
							decl.raws.between = `${' '.repeat(1 + maxPropLength - decl.prop.length)}: `;
						});
					}
					else {
						maxPropLength += ' :'.length;
						declarationBlock.forEach(decl => {
							if ((decl.raws.between.indexOf(':') + decl.prop.length + 1) !== maxPropLength) {
								stylelint.utils.report({
									ruleName,
									result,
									message : messages.expected(),
									node    : decl,
									index   : decl.source.start.line,
								});
							}
						});
					}
					declarationBlock = [];
				}
			});
		});
	};
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
