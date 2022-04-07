module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  plugins: ["react", "react-native", "import"],
  extends: [
    "eslint:recommended",
    "plugin:import/errors " , 
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "airbnb-base"
  ],
  rules: {
    "class-methods-use-this": "off",
    "no-use-before-define": "off"
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        "rootPathPrefix": "~",
        "rootPathSuffix": "src"
      }
    }
  },
  env: {
    "jest": true
  }
};

