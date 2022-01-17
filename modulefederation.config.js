const deps = require("./package.json").dependencies;

module.exports = {
  name: "ContainerApp",
  remotes: {

    // ChildApp: `promise new Promise(resolve => {
    //   const urlParams = new URLSearchParams(window.location.search)
    //   const version = urlParams.get('app1VersionParam')

    //   // This part depends on how you plan on hosting and versioning your federated modules
    //   const remoteUrl = 'http://localhost:3002/remoteEntry.js'
    //   const script = document.createElement('script')

    //   script.src = remoteUrl

    //   script.onload = () => {
    //     // the injected script has loaded and is available on window
    //     // we can now resolve this Promise
    //     const proxy = {
    //       get: (request) => window.ChildApp.get(request),
    //       init: (arg) => {
    //         try {
    //           return window.ChildApp.init(arg)
    //         } catch(e) {
    //           console.log('remote container already initialized')
    //         }
    //       }
    //     }
    //     resolve(proxy)
    //   }

    //   // inject this script with the src set to the versioned remoteEntry.js
    //   document.head.appendChild(script);
    // })
    // `

    ChildApp: "ChildApp@http://localhost:3002/remoteEntry.js",
  },
  // I think filename is only needed if we want to expose this application as a child too.
  // filename: "remoteEntry.js",
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
