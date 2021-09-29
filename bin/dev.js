const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');

const compiler = webpack(webpackConfig);

compiler.run((err) => {
  if (err) {
    console.log('Compilation failed: ', err);
  }

  compiler.watch({}, (err) => {
    if (err) {
      console.log('Compilation failed: ', err);
    }
    console.log('Compilation finished');
  });
  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client'),
    ],
  })
});
