'use strict'

const tester = require('./src/tester');

const fs = require('fs');
const path = require('path');

/**
 * Create a test instance.
 * @param {{name: string, args?: string[]}[]} Names and command line arguments for every test module.
 * @param {{testPath?: string, testFilePostfix?: string}} config `testPath`: The absolute / relative path to the test folder. Defaults to './test'. `testFilePostfix`: The postfix of test files. Defaults to '_test.js'.
 */
function RumTest(tests, config) {
  if (tests.length <= 0) {
    console.error('**RumTest: No tests specified**\n');
    return;
  }

  // Gets absolute path to the test folder
  const cwd = process.cwd();
  config = config || { testPath: undefined, testFilePostfix: undefined };
  let testPath = config.testPath || './test';
  if (typeof testPath !== 'string') {
    console.error('**RumTest: Invalid value: `testPath` is not a string!\n');
    throw new Error();
  }
  if (!path.isAbsolute(testPath)) {
    testPath = path.join(cwd, testPath);
  }

  // Normalize test file postfix
  let testFilePostfix = config.testFilePostfix || '_test.js';
  if (typeof testFilePostfix !== 'string') {
    console.error('**RumTest: Invalid value: `testFilePostfix` is not a string!\n');
    throw new Error();
  }
  if (!testFilePostfix.endsWith('.js')) {
    testFilePostfix += '.js';
  }

  // main => main_test
  let testNames = tests.map(t => t.name + testFilePostfix.slice(0, testFilePostfix.length - 3));

  // Test module file names resolved from the test folder
  let testModules = [];
  try {
    const ls = fs.readdirSync(testPath);
    for (let i = 0; i < ls.length; i++) {
      let fn = ls[i];
      if (fn.endsWith(testFilePostfix)) {
        // trim extension name
        testModules.push(fn.slice(0, fn.length - 3));
      }
    }
  } catch (e) {
    console.error('**RumTest: Fatal: Cannot open test folder!**\n');
    throw e;
  }
  if (testModules.length <= 0) {
    console.error('**Error: No modules found under test directory ' + testPath + '**\n');
    return;
  }

  let validModules = [];
  // TODO: Use camel_pascal to convert module file names (in snake_case) to module class name (in PascalCase).
  let wantModules = testNames.sort();
  let foundModules = testModules;
  do {
    let i = 0, j = 0;
    while (i < wantModules.length && j < foundModules.length) {
      if (wantModules[i] === foundModules[j]) {
        validModules.push({
          name: wantModules[i],
          args: tests[i].args
        });
        i++; j++;
      } else if (wantModules[i] < foundModules[j]) {
        console.warn('*Warning: Test module \'' + wantModules[i] + '\' not exists*\n');
        i++;
      } else {
        j++;
      }
    }
  } while(0);
  wantModules = null;
  foundModules = null;

  for (let i = 0; i < validModules.length; i++) {
    let test = validModules[i];
    test = path.join(testPath, test.name);
    let TestClass = require(test);
    if (typeof TestClass !== 'function') {
      console.error('**Error: Test module \'' + test + '\' does not export a function**')
      continue;
    }
    console.log('TEST  ' + TestClass.name);
    let result = new TestClass().Test(test.args);
    if (result instanceof Array) {
      result.forEach(r => console.log(r));
    } else {
      console.log(r);
    }
  }
}

module.exports = {
  Test: RumTest,
  Tester: tester
}
