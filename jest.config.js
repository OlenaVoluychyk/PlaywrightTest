module.exports = {
    globals: {
        allureConfig: {
          epic: '',
          feature: '',
          story: '',
          issues: [],
          owner: '',
          severity: ''
        }
      },
    testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
    transform: {
      "^.+\\.(ts)$": "ts-jest",
    },
    reporters: ["default", "jest-allure"],
    testRunner: "jest-jasmine2",
    setupFilesAfterEnv: ['jest-allure/dist/setup', './jest.setup.js'],
  };