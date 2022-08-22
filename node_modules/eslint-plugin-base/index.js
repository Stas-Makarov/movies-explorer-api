module.exports = {
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "@vue/standard",
    "@vue/airbnb"
  ],
  "rules": {
    "import/extensions": [
      "off"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1,
        "maxBOF": 0
      }
    ],
    "curly": [
      "error",
      "multi"
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "never",
        "prev": [
          "expression",
          "const",
          "let",
          "var",
          "for",
          "empty"
        ],
        "next": [
          "expression",
          "const",
          "let",
          "var",
          "for",
          "empty"
        ]
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": [
          "if",
          "return",
          "throw",
          "function",
          "class",
          "export",
          "cjs-export"
        ]
      },
      {
        "blankLine": "always",
        "prev": [
          "if",
          "function",
          "class",
          "cjs-import",
          "import"
        ],
        "next": "*"
      },
      {
        "blankLine": "never",
        "prev": [
          "cjs-import",
          "import"
        ],
        "next": [
          "cjs-import",
          "import"
        ]
      },
      {
        "blankLine": "never",
        "prev": "if",
        "next": "if"
      }
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "ForInStatement",
        "message": "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
      },
      {
        "selector": "LabeledStatement",
        "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
      },
      {
        "selector": "WithStatement",
        "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
      }
    ],
    "no-shadow": [
      "off"
    ],
    "no-underscore-dangle": [
      "off"
    ],
    "no-plusplus": [
      "off"
    ],
    "no-param-reassign": [
      "off"
    ],
    "prefer-destructuring": [
      "off"
    ],
    "max-len": [
      "error",
      256,
      2,
      {
        "ignoreUrls": true,
        "ignoreComments": false,
        "ignoreRegExpLiterals": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignorePattern": "d=\"(m|M)"
      }
    ],
    "no-use-before-define": [
      "error",
      {
        "functions": false,
        "classes": true
      }
    ],
    "no-empty": "off",
    "global-require": "off",
    "consistent-return": "off",
    "no-continue": "off",
    "no-console": "off",
    "no-await-in-loop": "off",
    "radix": "off",
    "no-nested-ternary": "off",
    "object-curly-newline": "off",
    "import/no-unresolved": "off",
    "func-names": "off",
    "camelcase": "off",
    "arrow-parens": "off",
    "import/prefer-default-export": "off",
    "vue/script-indent": [
      "error",
      2,
      {
        "baseIndent": 1
      }
    ],
    "vue/html-indent": [
      "error",
      2,
      {
        "attribute": 1,
        "baseIndent": 1,
        "closeBracket": 0,
        "alignAttributesVertically": true,
        "ignores": []
      }
    ],
    "semi": [
      "error",
      "never"
    ],
    "lines-between-class-members": "off",
    "class-methods-use-this": "off"
  },
  "overrides": [
    {
      "files": [
        "*.vue"
      ],
      "rules": {
        "indent": "off"
      }
    }
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "ecmaVersion": 2020
  }
}
