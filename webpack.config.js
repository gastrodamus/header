const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
const path = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const config = {
  entry: path.resolve(__dirname, 'client/src/index.jsx'),
  module: {
    rules: [
      {
        test: [/\.(js|jsx)$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  plugins: [
    // new BrotliGzipPlugin({
    //   asset: '[path].br[query]',
    //   algorithm: 'brotli',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    // new BrotliGzipPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
  ],
};
const browserConfig = {
  entry: './client/dist/index.js',
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
  ],
};

const serverConfig = {
  entry: './server/index.js',
  node: {
    __filename: false,
    __dirname: false,
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server/server.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
};

module.exports = [browserConfig, serverConfig];
