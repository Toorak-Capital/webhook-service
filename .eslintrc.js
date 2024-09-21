module.exports = {
  env: {
    node: true,
    es2022: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jsdoc/recommended',
  ],
  plugins: [
    'jsdoc',
  ],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    'require-jsdoc': ['error', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
        ArrowFunctionExpression: false,
        FunctionExpression: false,
      },
    }],
    'jsdoc/require-description': 'error',
    'jsdoc/require-example': 'warn',
    'jsdoc/require-param': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-property': 'error',
    'jsdoc/require-returns': 'error',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
  },
  overrides: [
    {
      files: ['test/**/*.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
