const config = require('@toba/test/jest');
config.transform = {
   '^.+\\.(ts|tsx)$':
      '<rootDir>/node_modules/@stencil/core/testing/jest.preprocessor.js'
};
module.exports = config;
