require('dotenv').config();
module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: [
        "features/step-definitions/*.ts",
        "features/support/hooks.ts"
    ],
    requireModule: [
        "ts-node/register",
        "tsconfig-paths/register"
    ],
    format: [
      "progress",
      "allure-cucumberjs/reporter"
    ],
    formatOptions: {
      resultsDir: "allure-results"
    }
  }
};