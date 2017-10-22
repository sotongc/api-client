'use strict';

/**
 * tokenizer
 * ------	   
 * > Divide the plaintext into a flat list of pre AST node called tokens;
 * > The PARSER will then use the tokens to construct the AST;
 */
function tokenizer(input){
	let cursor=0;

	let tokens=[];

	while(cursor.input.length){
		let char=input[cursor];

		if(char==='('){
			tokens.push({
				type:'paren',
				value:'('
			});

			cursor++;
			continue;
		}

		if(char===")"){
			tokens.push({
				type:'paren',
				value:")"
			});
			cursor++;
			continue;
		}

		let WHITESPACE=/\s/;
		if(WHITESPACE.test(char)){
			current++;
			continue;
		}

		let NUMBERS=/\d/;
		if(NUMBERS.test(char)){
			let value='';

			while(NUMBERS.test(char)){
				value+=char;
				char=input[++cursor];
			}

			tokens.push({type:'number',value:value});
			continue;
		}

		if(char==='"'){
			let value="";

			char=input[++cursor];

			while(char !=='"'){
				value+=char;
				char=input[++cursor];
			}

			char=input[++cursor];

			tokens.push({type:'string',value});

			continue;
		}

		let LETTERS=/\w/i;

		if(LETTERS.test(char)){
			let value='';

			while(LETTERS.test(char)){
				value+=char;
				char=input[++cursor];
			}

			tokens.push({type:'name',value});

			continue;
		}

		throw new TypeError("Unknown value type");	
	}

	return tokens;
}

/**
 * parser
 * ------
 * > Aim to turn the tokens into AST
 * > [] => {type:"",body:[...]}
 */
function parser(tokens){
	let cursor=0;

	function walk(){
		let token=tokens[cursor];

		if(token.type==='number'){
			cursor++;

			return {
				type:'NumberLiteral',
				value:token.value
			};
		}

		if(token.type==="paren" && token.value==="("){
			token=tokens[++cursor];

			let node={
				type:'CallExpression',
				name:token.value,
				params:[],
			};

			token=tokens[++cursor];
		
			while((token.type!=='paren')||(token.type==="paren" && token.value!==')')){
				node.params.push(walk());
				token=tokens[cursor]
			}

			cursor++;
			return node;
		}
		throw new TypeError(token.type);
	}

	let ast={
		type:"Program",
		body:[]
	};

	while(cursor<tokens.length){
		ast.body.push(walk());
	}

	return ast;
}

/**
 * traverser
 * ------
 * > Methods collection for visit different typeof nodes;
 *
 */

 function traverser(ast,visitor){
 	function traverseArray(array,parent){
 		array.forEach(child=>{
 			traverseNode(child,parent);
 		});
 	}

 	function traverseNode(node,parent){
 		let methods=visitor[node.type];

 		if(methods && methods.enter){
 			methods.enter(node,parent);
 		}

 		switch (node.type){
 			case 'Program':
 				traverseArray(node.body,node);
 				break;

 			case 'CallExpression':
 				traverseArray(node.params,node);
 			case 'NumberLiteral':
 				break;
 			case 'StringLiteral':
 				break;
 			default:
 				throw new TypeError(node.type);
 		}

 		if(methods && methods.exit){
 			methods.exit(node,parent);
 		}
 	}

 	traverseNode(ast,null);
 }

/**
 * transformer
 * ------
 * > Used to transfer one AST to the other according some mapping rules;
 */

 function transformer(ast){
 	let newAst={
 		type:"Program",
 		body:[]
 	};

 	ast._context = newAst.body;

 	traverser(ast,{
 		NumberLiteral:{
 			enter(node,parent){
 				parent._context.push({
 					type:'NumberLiteral',
 					value:node.value
 				});
 			}
 		},

 		StringLiteral:{
 			enter(node,parent){
 				parent
 			}
 		},

 		CallExpression:{
 			enter(node,parent){
 				let expression={
 					type:"CallExpression",
 					callee:{
 						type:'Identifier',
 						name:node.name
 					},
 					arguments:[]
 				};

 				node._context=expression.arguments;

 				if(parent.type!=='CallExpression'){
 					expression={
 						type:'ExpressionStatement',
 						expression:expression
 					};
 				}
 				parent._context.push(expression);
 			}
 		}
 	});

 	return newAst;
 }

/**
 * code generator
 * ------
 * > print each node into an giant string which is the final code plain text
 */

 function codeGenerator(node){
 	switch(node.type){
 		case 'Program':
 			return node.body.map(codeGnerator).join('\n');
 		case 'ExpressionStatement':
 			return (codeGenerator(node.expression)+";");
 		case 'CallExpression':
 			return (codeGenerator(node.callee)+'('+node.arguments.map(codeGenerator).join(', ')+')');
 		case 'Identifier':
 			return node.name;
 		case 'NumberLiteral':
 			return node.value;
 		case 'StringLiteral':
 			return '"'+node.value+'"';
 		default:
 			throw new TypeError(node.type);
 	}
 }

 /**
  * complier
  * ------
  * > main func
  */

  function compiler(input){
  	return codeGenerator(transformer(parser(tokenizer(input))));
  }

  module.exports=compiler;