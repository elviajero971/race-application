module.exports = {
    testEnvironment: 'jsdom',
    clearMocks: true,
    setupFilesAfterEnv: ['<rootDir>/app/javascript/react/setupTests.js'],
    testMatch: ['<rootDir>/app/javascript/react/_tests_/**/*.[jt]s?(x)'],
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/app/javascript/react/components/$1',
        '^@pages/(.*)$': '<rootDir>/app/javascript/react/pages/$1',
        '^@hooks/(.*)$': '<rootDir>/app/javascript/react/hooks/$1',
        '^@utils/(.*)$': '<rootDir>/app/javascript/react/utils/$1',
    },
};
