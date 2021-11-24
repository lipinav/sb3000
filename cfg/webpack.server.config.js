const path = require('path');
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_CSS_REGEXP = /\.global\.css$/;
const COMMON_PLUGINS = [ new DefinePlugin({'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`})]

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  target: "node",  // this build only for nodejs. 
                   // bundle for node differs from brouser bundle
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              onlyLocals: true,
            }
          },
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],

        // test: /\.(svg|png|jpg|gif)$/i,
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192,
        //     },
        //   },
        // ],

        // test: /\.svg$/,
        // use: ['svg-inline-loader'],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: COMMON_PLUGINS,
};
