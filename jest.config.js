module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  roots: ["<rootDir>/tests/"],
  setupFiles: ["dotenv/config"],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.tests.json'
    }
  }
};