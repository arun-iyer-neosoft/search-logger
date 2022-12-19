// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
};

module.exports = createJestConfig(customJestConfig);
