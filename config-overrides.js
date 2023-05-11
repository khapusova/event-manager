const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@atoms": "./src/components/atoms",
    "@molecules": "./src/components/molecules",
    "@organisms": "./src/components/organisms",
    "@templates": "./src/components/templates",
    "@utils": "./src/utils",
    "@screens": "./src/screens",
    "@styles": "./src/styles",
    "@navigation": "./src/navigation",
    "@store": "./src/store",
    "@mixins": "./src/mixins",
    "@translations": "./src/translations",
    "@src": "./src"
  })(config);

  return config;
};
