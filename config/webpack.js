module.exports={
    entry: {
        app:pwd+'/src/index.js'
    },
    output: {
        filename: '[name]_main_[hash].js',
        path: path.join(pwd, 'dist'),
        chunkFilename: '[name]_chunk_[chunkhash].js',
    },
    module: {
        rules: [
            {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('[name].style.[hash].css'),
        new htmlWebpackPlugin({
            filename: path.join(pwd,"dist",'index.html'),
            template: path.join(pwd,'src/index.html'),
            inject: 'body',
            chunks:['app']
        }),//html生成
        new webpack.DefinePlugin({
            'a': JSON.stringify('__DEV__')
        })
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
}