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
				if (node.type === 'decl') {
					declarationBlock.push(node);
				}

				if (declarationBlock.length > 0 && (node.type !== 'decl' || !node.next())) {
					const maxPropLength = Math.max(...declarationBlock.map(node => node.prop.length));

					declarationBlock.forEach(decl => {
						if (context.fix) {
							decl.raws.between = `${' '.repeat(1 + maxPropLength - decl.prop.length)}: `;
						}
						else if (decl.prop.length < maxPropLength) {
							stylelint.utils.report({
								ruleName,
								result,
								message : messages.expected(),
								node    : decl,
								index   : decl.source.start.line,
							});
						}
					});

					declarationBlock = [];
				}
			});
		});
	};
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
