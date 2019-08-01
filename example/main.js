const test = require('..');

const argv = process.argv.slice(2);
const tests = argv.map(name => new Object({
  name,
  args: []
}));

test.Test(tests);
