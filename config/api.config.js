export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  rootDir: "..",
//   testMatch: ["<rootDir>/test_api/**/*.spec.ts"]
testMatch: ["<rootDir>/src/cw20.ts"]
  
 
};
