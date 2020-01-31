const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {loader: 'ts-loader'},
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      }
    ]
  }
}
