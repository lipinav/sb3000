module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css)': 'identity-obj-proxy'
  },
  snapshotSerializers: ['enzyme-to-json/serializer']
};
