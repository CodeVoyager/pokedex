module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/client/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/universal/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/server/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/file-mock.js',
    '\\.(css)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  setupFiles: ['jest-date-mock'],
  setupFilesAfterEnv: ['<rootDir>/test-config.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
