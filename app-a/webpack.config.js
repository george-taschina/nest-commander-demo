module.exports = function (options) {
  return {
    ...options,
    devtool: 'source-map',
    externalsPresets: { node: true },
  };
};
