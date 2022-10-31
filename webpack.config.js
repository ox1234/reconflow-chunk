const path = require('path')

module.exports = {
    target: 'node', mode: 'development', entry: './main.ts', output: {
        filename: 'main.js', path: path.resolve(__dirname, './dist')
    }, resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }, module: {
        rules: [{
            test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader'
        }]
    }, plugins: []
}
