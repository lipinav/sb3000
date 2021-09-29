const path = require('path');  // to create abs path

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV == 'development'
const IS_PROD = NODE_ENV == 'production';

function setupDevtool() {
  if (IS_DEV) return 'eval';
  if (IS_PROD) return false;
}

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },  // to resolve jsx files
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',   // bundle name
  },
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
  plugins: [
  ],
  devtool: setupDevtool(),   // for source maps
};
