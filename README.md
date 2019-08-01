# RumTester

A test framework for Node.js application.



Usage:

```javascript
// Source file to be tested: math.js
module.exports = {
  factorial: function(x) {
    return !x ? 1 : x * factorial(x - 1);
  },
  fibonacci: function(n) {
    return n === 0 ? 0 : n === 1 ? 1 :
      fibonacci(n - 1) + fibonacci(n - 2);
  }
}

// Test module file: math_test.js
const test = require('rumtester');
const Having = test.Tester.Having;
const math = require('../src/math');

class MathTest {
  Test() {
    let result = [];

    result.push(Having('MathTest:factorial',
        math.factorial(0))
      .expect(1)
    .andHaving(math.factorial(6))
      .expect(720)
    .result().message);

    result.push(Having('MathTest:fibonacci',
        math.fibonacci(0))
      .expect(0)
    .andHaving(math.fibonacci(1))
      .expect(1)
    .andHaving(math.fibonacci(20))
      .expect(6765)
    .result().message);

    return result;
  }
}

// main.js
const Test = require('rumtester').Test;
const argv = process.argv.slice(2);

const tests = [
  { name: 'main', args: [] }
]

Test(tests)

// Result
// > TEST  main_test
// > All tests passed.
// > All tests passed.
```

## Configuration

You can config test folder path and test file postfix for every main test file.

```javascript
// main.js

...

Test(tests, {
  testPath: './lib/test', // default: ./test
  testFilePostfix: '.js'  // default: _test.js
})
```

You can also specify absolute path for `testPath`.

