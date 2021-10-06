// for code auto rebuilding and server auto restarting
const webpack = require('webpack');
const [ webpackClientConfig, webpackServerConfig ] = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(webpackDevMiddleware(clientCompiler, {
  publicPath: webpackClientConfig.output.publicPath, // config must be same as in webpack.client.config.js
  serverSideRender: true,  // put bundle info in requests locals
  noInfo: true, // mute bunlde building info
  watchOptions: {
    ignore: /dist/,   // because there are already compiled code in dist
  },
  writeToDisk: true,  // write our bundle to ./dist/. but by default webpack-dev-middleware works with dev server and does not write files to disk. but we need to send client.js from static and hot updates by express server but not webpack-dev-server
  stats: 'errors-only',   // turn off compile logs
}));   // connect external middleware

hmrServer.use(webpackHotMiddleware(clientCompiler, {
  path: '/static/__webpack_hmr',  // server would send data from this dir
}));

hmrServer.listen(3001, () => {
  console.log('HMR server started');
});


const compiler = webpack(webpackServerConfig);

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
    delay: 3000,
  })
});
