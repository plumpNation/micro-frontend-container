const webpack = require("webpack");
const paths = require("react-scripts/config/paths");

const getModuleFederationConfig = (additionalPaths = []) => {
  const path = require("path");
  const fs = require("fs");
  const appDirectory = fs.realpathSync(process.cwd());
  const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

  const moduleFederationConfigFiles = [
    "modulefederation.config.js",
    ...additionalPaths,
  ];

  const moduleFederationConfigPath = moduleFederationConfigFiles
    .map(resolveApp)
    .filter(fs.existsSync)
    .shift();

  if (moduleFederationConfigPath) {
    return require(moduleFederationConfigPath);
  }

  return null;
};

module.exports = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    const moduleFederationConfig = getModuleFederationConfig();

    if (!moduleFederationConfig) {
      return webpackConfig;
    }

    webpackConfig.output.publicPath = "auto";

    const htmlWebpackPlugin = webpackConfig.plugins.find(
      (plugin) => plugin.constructor.name === "HtmlWebpackPlugin"
    );

    htmlWebpackPlugin.userOptions = {
      ...htmlWebpackPlugin.userOptions,
      publicPath: paths.publicUrlOrPath,
      excludeChunks: [moduleFederationConfig.name],
    };

    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new webpack.container.ModuleFederationPlugin(moduleFederationConfig),
    ];

    return webpackConfig;
  },

  overrideDevServerConfig: ({ devServerConfig }) => {
    devServerConfig.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    };

    return devServerConfig;
  },
};