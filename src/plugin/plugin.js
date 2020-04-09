
function PromisePlugin(options) {
}

PromisePlugin.prototype.apply = function(compiler) {
  // 设置回调来访问 compilation 对象：
  // compiler.plugin("compile", function(compilation) {
  //   // setTimeout(()=>{console.log(compilation,'compiler');console.log(compiler,'compiler2')},2000)
  //   console.log(compilation,'compiler')
  //   compiler.options.entry.unshift(__dirname+'/promiseDomyself.js')
  // });
  // compiler.hooks.compile.tap('MyPlugin', compilation => {
  //   // console.log("compilation",compilation)
  //   compiler.options.entry.unshift(__dirname+'/promiseDomyself.js')
  // })

  compiler.hooks.beforeCompile.tap('MyPlugin', compilation => {
    compiler.options.entry.unshift(__dirname+'/promiseDomyself.js')
  })

  compiler.hooks.done.tap('MyPlugin', compilation => {
 
  })
};

module.exports = PromisePlugin;