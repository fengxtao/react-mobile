module.exports = {
    "presets": [
      [
        "@babel/preset-env", {
          "modules": false,
          "targets": {
            "browsers": ["last 2 Chrome versions", "IE >= 9"]
          },
          "useBuiltIns":"usage",
          "corejs": { version: 3, proposals: true },
        }
      ],
      "@babel/react"
    ],
    "plugins":[
      ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
      ["@babel/plugin-proposal-class-properties"]
      // 按需打包组件
      // ["import", {
      //   "libraryName": "antd",
      //   "libraryDirectory": "es",
      //   "style": "css" // `style: true` 会加载 less 文件
      //   }]
    ]
  }
  