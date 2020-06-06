module.exports = {
  collectCoverageFrom: ['packages/**/*.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/docs',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/docs/',
  ],
  roots: ['packages/'],
};
