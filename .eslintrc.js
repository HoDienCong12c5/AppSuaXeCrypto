module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest":true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-unused-vars":'off',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    indent: [2, 2],
    'space-in-parens': ['error', 'always'],
    // 'linebreak-style': ['error', 'windows'],
    'prettier/prettier': ['error', {
      'no-inline-styles': false
    }],
    'react/prop-types': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'no-plusplus': 'off',
    'comma-dangle': ['error', 'never'],
    'max-len': 'off',
    'object-shorthand': 0 
  }
}
