module.exports = {
    "presets": [
      [
        "@babel/preset-env", {
          "modules": false,
          "targets": {
            "browsers": ["last 2 Chrome versions", "IE >= 9"]
          },
          // "useBuiltIns":"usage"
        }
      ],
      "@babel/react"
    ],
    "plugins":[
      // 按需打包组件
      // ["import", {
      //   "libraryName": "antd",
      //   "libraryDirectory": "es",
      //   "style": "css" // `style: true` 会加载 less 文件
      //   }]
    ]
  }
  