module.exports = {
  "plugins": [
    "import",
    "react"
  ],
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jest": true,
  },
  "rules": {
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": [2],
    "import/prefer-default-export": 0,
    "arrow-parens": ["error", "always"],
    "class-methods-use-this": 0,
    "no-param-reassign": ["error", { "props": false }],
    "max-len": ["error", { "code": 120 }],
    "no-underscore-dangle": 0,
  }
};
