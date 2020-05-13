const path = require('path');
const fs = require('fs')
const webpack =require('webpack') ;
const merge = require('webpack-merge')
const baseConfig=require('./webpack.base');
const pwd = process.cwd();

//config 扩展
let extendConfig={};
let extendConfigPath=path.join(pwd,process.env.extendConfig||'webpack.dev.extendConfig.js');
if( fs.existsSync(extendConfigPath) ){
  extendConfig= require(extendConfigPath);
}

let devConfig={
  mode:'development',
  plugins: [
  ],
  devtool: 'inline-source-map',//开发助手
  devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		hot: true,
		inline: true,
    port: 3000,
    host:'0.0.0.0',
		// host: '127.0.0.1',
		// Required for webpack-dev-server.
		// outputPath: path.resolve(__dirname, 'dist'),
    disableHostCheck: true,
    historyApiFallback:true
    // proxy: {
    //   '/post': {
    //     // target: 'http://localhost:2000',
    //     bypass: function(req, res, proxyOptions) {
    //       // net_init(req,res);
    //       setTimeout(function(){
    //         res.end(s)
    //       },100)   
    //     }
    //   }
    // }
  },
}

module.exports = merge(baseConfig,devConfig,extendConfig)
