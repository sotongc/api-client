var path=require('path');
var webpack=require('webpack');

module.exports={
	entry:{
		app:'./src/js/app.js'
	},
	output:{
		path:path.resolve(__dirname,"../dist"),
		publicPath:'/dist/',
		filename:'js/[name].bundle.js'
	},
	devtool:"cheap-module-eval-source-map",
	module:{
		rules:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/
			},
			{
				test:/\.(jpg|png|svg|gif|html)$/,
				loader:"file-loader",
				options:{
					name:"img/[name].[ext]?[hash]"
				}
			},
			{
				test:/\.(woff2|eot|ttf|otf)$/,
				loader:'url-loader',
				options:{
					name:'[name].[ext]',
					limit:50000,
					publicPath:"font/",
					outputPath:path.resolve(__dirname,"../dist/")
				}
			},
			{
				test:/\.css$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader',options:{sourceMap:true}}
				]
			},
			{
				test:/\.scss$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader',options:{sourceMap:true}},
					{loader:'sass-loader',options:{sourceMap:true}}
				]
			},
			{
				test:/\.vue$/,
				loader:"vue-loader",
				exclude:/node_modules/,
				options:{
					loaders:{
						scss:'vue-style-loader!css-loader!sass-loader'
					}
				}
			}
		]
	},
	resolve:{
		alias:{
			'vue':'vue/dist/vue.runtime.esm.js'		
		}
	},
	devServer:{
		contentBase:path.resolve(__dirname,"../views/"),
		port:8081,
		compress:true,
		inline:true,
		proxy:{}
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:JSON.stringify('development')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor',
			filename:'./js/vendor.common.js',
			minChunks:2
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
