module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './test/',
  testEnvironment: 'node',
  testRegex: '.test.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  }
};
