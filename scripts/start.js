const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const config = require('../config/webpack.config.dev.js');
const choosePort=require('./chose')
const isInteractive = process.stdout.isTTY;
const clearConsole=require('./clearConsole')
const chalk =require('chalk')
const openBrowser=require('./openBrowser')
const pwd = process.cwd();

const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
let IPAddress = '';
for(var devName in interfaces){  
  var iface = interfaces[devName];  
  for(var i=0;i<iface.length;i++){  
        var alias = iface[i];  
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
              IPAddress = alias.address;  
        }  
  }  
} 

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || IPAddress;

const options = {
    contentBase: path.join(pwd, 'dist'),
    hot: true,
    inline: true,
    disableHostCheck: true,
    open:true,
    host:HOST
};

choosePort(HOST,DEFAULT_PORT).then((port)=>{
    webpackDevServer.addDevServerEntrypoints(config, options);
    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, options);
    
    server.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        // clearConsole();
      }
      console.log(chalk.cyan('Starting the development server...\n'));
      // openBrowser('http://'+HOST+':'+port);
    });
})



