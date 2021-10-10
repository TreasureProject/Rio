module.exports = {
  testEnvironment: 'node',
  testRegex: '(/*/.*/__(tests|integration|api)__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testRunner: 'jest-jasmine2',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
};
