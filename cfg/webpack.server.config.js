const path = require('path');  // to create abs path
const nodeExternals = require('webpack-node-externals');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  target: 'node', // this build only for nodejs; bundle for browser diffs from bundle for nodejs
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },  // to resolve jsx files
  externals: [nodeExternals()],
  module: {  // loader configure
    rules: [{
      test: /\.[tj]sx?$/,
      use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
    }]
  },
  optimization: {
    minimize: false,
  },
};
