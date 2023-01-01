const HtmlWebpackPlugin = require('html-webpack-plugin');//生成 HTML 模板，简易模板配置步骤
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

//清理dist文件夹的插件，用来在每次执行构建的时候清空上次构建的结果防止文件缓存
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
    mode:'development',
	entry:{
		index: path.join(__dirname, './src/index.tsx'), // 入口文件
    },
    devServer: {
        static:[
			path.resolve(__dirname,'dist'),//这里是构建目标路径
			path.resolve(__dirname,'public')//这里是public部分的内容
		],
		hot:true,
		host:'localhost',
		port:8080,
		open:true
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js',
		publicPath:''
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./public/index.html',
			filename:'index.html',
        }),
        new MiniCssExtractPlugin({
			filename:'[name].css'
        }),
        new CompressionPlugin({
			algorithm: "gzip",
			test: /\.js$|\.html$|\.css$/,
			threshold: 10240,
			minRatio: 0.8
		})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: [
                        ['@babel/preset-env'],
                        ['@babel/preset-react', {runtime: 'automatic'}],
                        ['@babel/preset-typescript']
                    ]
                    }
                }
            },
            {
                test: /\.less$/i,
                use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'less-loader'}
				]
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     'less-loader',
                // ],
            },
            {
            test: /\.d\.ts$/,
            loader: 'ignore-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    'file-loader',
                ]
			}
    ],
    },
    resolve:{
		extensions:['.js','.jsx','.ts','.tsx','.less','.sass'],
		alias:{
            '@': path.resolve(__dirname, 'src')
		}
	}
}