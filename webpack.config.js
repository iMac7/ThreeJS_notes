const htmlplugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
    mode: "development",
    // resolve: {
    //     extensions: ['*'],
    //     modules: ['./src', 'node_modules'],
    //   },
    entry: {
        // index: './src/index.js',
        // index2: './src/index2.js',
        // house: './src/house.js',
        // particles: './src/particles.js',
        // physics: './src/physics.js',
        // gltf: './src/gltf.js',
        shaders: './src/shaders.js'
      },
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: "[name].js",
        assetModuleFilename: "[name][ext]",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|mp4|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/i,
                use: ['raw-loader']
            },
            
        ]
    },
    plugins: [
        new htmlplugin({
            title: "WP app",
            filename: "index.html",
            template: "src/index.html",
            chunks: ["index", "index2", "house", "particles", "physics", 'shaders']

        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 2000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    }
}