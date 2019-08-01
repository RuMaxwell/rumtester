const tester = require('./src/tester');

const fs = require('fs');
const path = require('path');

/**
 * Create a test instance.
 * @param {string[]} tests Names of the modules to be tested.
 * @param {{testPath?: string, testFilePostfix?: string}} config `testPath`: The absolute / relative path to the test folder. Defaults to './test'. `testFilePostfix`: The postfix of test files. Defaults to '_test.js'.
 */
function RumTest(tests, config) {
  const cwd = process.cwd();
  let testPath = config.testPath || './test';
  if (typeof testPath !== 'string') {
    console.error('**RumTest: Invalid value: `testPath` is not a string!');
    throw new Error();
  }
  if (!path.isAbsolute(testPath)) {
    testPath = path.join(cwd, testPath);
  }
  let testFilePostfix = config.testFilePostfix || '_test.js';
  if (typeof testFilePostfix !== 'string') {
    console.error('**RumTest: Invalid value: `testFilePostfix` is not a string!');
    throw new Error();
  }
  if (!testFilePostfix.endsWith('.js')) {
    testFilePostfix += '.js';
  }

  // Test modules file names resolved from the test folder
  let testModules = [];
  try {
    const ls = fs.readdirSync(testPath);
    for (let i = 0; i < ls.length; i++) {
      let fn = ls[i];
      if (fn.endsWith(testFilePostfix)) {
        testModules.push(fn.slice(0, fn.length - 3));
      }
    }
  } catch (e) {
    console.error('**RumTest: Fatal: Cannot open test folder!**');
    throw e;
  }

  let validTests = [];
  do {
    if (tests.length <= 0 || testModules.length <= 0) {
      break;
    }

    let i = 0, j = 0;
    while (i < tests.length && j < testModules.length) {
    }
  } while(0);

  let Testers = [];
  for (let i = 0; i < testModules.length; i++) {
    let testName = testModules[i];
    let TestClass = require(testName);
    Testers.push(TestClass);
  }
}

module.exports = RumTest
