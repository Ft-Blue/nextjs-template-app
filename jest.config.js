const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig.json");

process.env.TZ = "GMT";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  coverageThreshold: {
    global: {
      branches: 50,
      lines: 50,
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    // Allow Jest to resolve custom paths from tsconfig.json paths
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
  setupFiles: ["<rootDir>/jest.polyfills.js"],
};

module.exports = createJestConfig(customJestConfig);
