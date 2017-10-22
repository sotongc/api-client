var path=require('path');
var webpack=require('webpack');

var BabiliPlugin=require('babili-webpack-plugin');
var ExtractTextPlugin=require('extract-text-webpack-plugin');
var OptimizeCssPlugin=require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin=require('html-webpack-plugin');

//test
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//entries
var tpl=['app'];

var config={
	entry:{
		app:'./src/js/app.js'
	},
	output:{
		path:path.resolve(__dirname,'../dist'),
		publicPath:'../',
		filename:'js/[name].bundle.js?[hash]'
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader',
				exclude:/node_modules/,
				options:{
					loaders:{
						scss:ExtractTextPlugin.extract({
							use:['css-loader','sass-loader'],
							fallback:'vue-style-loader'
						})
					}
				}
			},
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract({
					use:['css-loader'],
					fallback:'style-loader'
				})
			},
			{
				test:/\.scss$/,
				loader:ExtractTextPlugin.extract({
					use:['css-loader','sass-loader'],
					fallback:'style-loader'
				})
			},
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
			}
		]
	},
	//externals:{
	//	'quill':'Quill'
	//},
	resolve:{
		alias:{
			'vue':'vue/dist/vue.runtime.esm.js',
			'vuex':'vuex/dist/vuex.esm.js',
			'vue-router':'vue-router/dist/vue-router.esm.js',
			//'quill':'quill/dist/quill.js'
		}
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:JSON.stringify('production')
			}
		}),
		new ExtractTextPlugin({
			filename:"css/[name].style.css?[hash]",
			allChunks:true
		}),
		new OptimizeCssPlugin({
			assetNameRegExp:/\.css$/,
			cssProcessorOptions:{
				discardComments:{
					removeAll:true
				}
			},
			canPrint:true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor',
			filename:'js/vendor.common.js?[hash]',
			minChunks:2
		}),
		//new webpack.optimize.ModuleConcatenationPlugin(), //won't has effect due to some reason (multiple entries etc.)
		new BabiliPlugin({}),
		//new BundleAnalyzerPlugin()
	]
};

tpl.forEach(function(chunk){
	config.plugins.push(new HtmlWebpackPlugin({
		filename:'views/'+chunk+'.html',
		template:path.resolve(__dirname,'../template/tpl.ejs'),
		chunks:['vendor',chunk],
		title:chunk.replace(/^[a-z]/,chunk.charAt(0).toUpperCase()),
		inject:true
	}));
});

module.exports=config;

