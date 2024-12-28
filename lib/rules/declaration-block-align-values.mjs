import stylelint from "stylelint";

const { createPlugin, utils } = stylelint;

const ruleName = 'frontlobby/declaration-block-align-values';
const messages =  utils.ruleMessages(ruleName, {
	expected : 'Property values are not aligned',
});

function rule() {
	return (root, result) => {

		const validOptions = utils.validateOptions(result, ruleName, {});
		if (!validOptions) {
			return;
		}

		let declarationBlock = [];

		root.walk(node => {
			// skip inline comments
			if (node.type === 'comment' && !node.raws.before?.startsWith('\n')) {
				return;
			}

			const isDecl              = node.type === 'decl';
			const isLastNode          = !node.next();
			const emptyLineAbove      = node.raws.before?.startsWith('\n\n');
			const startOfNewDeclBlock = isDecl && emptyLineAbove;
			const endOfBlock          = !isDecl || emptyLineAbove || isLastNode;

			let addedToBlock = false;
			if (isDecl && !startOfNewDeclBlock) {
				declarationBlock.push(node);
				addedToBlock = true;
			}

			if (endOfBlock && declarationBlock.length > 0) {
				report(declarationBlock);
				declarationBlock = [];
			}

			if (isDecl && !addedToBlock) {
				declarationBlock.push(node);
			}

			// SHOULDDO: handle node.value also being a multiline declaration
		});

		function report(declarationBlock) {
			const maxPropLength = Math.max(...declarationBlock.map(node => node.prop.length));

			declarationBlock.forEach(node => {
				if (maxPropLength - node.prop.length === node.raws.between.indexOf(':') - 1) {
					return;
				}

				utils.report({
					ruleName,
					result,
					node,
					message : `${messages.expected}: ${node.prop}`,
					index   : node.source.start.line,
					fix     : function(decl, maxPropLength) {
					              decl.raws.between = ' '.repeat(maxPropLength - decl.prop.length) + ' : ';
							  }.bind(null, node, maxPropLength)
				});
			});
		};
	}
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = { fixable : true };

export default createPlugin(ruleName, rule);

// helper function used for debugging
function logNode(prefix, obj) {
	let propsToOmit = ['parent', 'source'];
	console.log(prefix, obj !== null && obj !== undefined ? serialize(obj) : '');

	function serialize(obj) {
		let result = [];

		for (let prop of Object.keys(obj)) {
			if (!propsToOmit.includes(prop)) {
				let value = obj[prop];
				if (typeof value === 'object') {
					value = serialize(value);
				}
				else if (typeof value === 'string') {
					value = value.replace(/\n/g, "\\n");
				}

				result.push(`${prop}: "${value}"`);
			}
		}

		return '{ ' + result.join(', ') + ' }';
	}
}