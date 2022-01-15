const deps = require("./package.json").dependencies;

module.exports = {
  name: "ContainerApp",
  remotes: {
    ChildApp: "ChildApp@http://localhost:3002/remoteEntry.js",
  },
  filename: "remoteEntry.js",
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};