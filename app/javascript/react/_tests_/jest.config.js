module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/_tests_/setupTests.js'],
    // Tell Jest to look for tests inside the _tests_ folder
    testMatch: ['<rootDir>/_tests_/**/*.[jt]s?(x)'],
    // Optionally, add moduleNameMapper if you use aliases in your project
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest"
    },
};
