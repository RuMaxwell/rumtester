const test = require('../..');
const having = test.Tester.Having;

class MainTest {
  Test() {
    let _ = [having('MainTest:0', 1 + 1)
      .expect(2)
    .andHaving(1 - 1)
      .expect(0)
    .result().message];

    _.push(having('MainTest:1', 2 * 3)
      .expect(6)
      .result().message);

    return _;
  }
}

module.exports = MainTest;
