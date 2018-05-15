module.exports = [{
  entry: "./app/index.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}];

module.exports.push({
  entry: "./app/firebase-messaging-sw.js",
  output: {
    filename: "firebase-messaging-sw.js",
    globalObject: 'this'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }],
  }
});
