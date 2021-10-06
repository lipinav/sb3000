// for code auto rebuilding and server auto restarting
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');

const compiler = webpack(webpackConfig);

compiler.run((err) => {   // cold start
  if (err) {
    console.log('Compilation failed: ', err);
  }

  compiler.watch({}, (err) => {   // {} <- default configs
    if (err) {
      console.log('Compilation failed: ', err);
    }
    console.log('Compilation finished');
  });
  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),  // watch for changes
      path.resolve(__dirname, '../dist/client'),
    ],
  })
});
