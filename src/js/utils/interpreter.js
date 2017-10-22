'use strict';

/**
 * steps
 * ------
 * 1. tokenizer divide to tokens
 * 2. parser parse the tokens into AST
 * 3. transformer to easy render format
 * 4. generate to output formmat
 * note: need an effactive way to mark tiny change on the whole document structure
 */

 const _Identifier={
 	title:/\#\s/
 };

