module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`
  },
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
    axios: `<rootDir>/src/__mocks__/axios-mock.js`
  },
  testPathIgnorePatterns: [`node_modules`, `\\.next`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules`],
  globals: {
    __PATH_PREFIX__: ``
  },
  testURL: `http://localhost`,
  testEnvironment: 'jsdom',
  setupFiles: [`<rootDir>/jest.env.vars.js`]
}
