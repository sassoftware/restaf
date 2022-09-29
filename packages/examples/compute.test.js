let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});
test("computeService: basic", async () => {
  expect.assertions();
  let l = await testFunctions.computeDS(testInfo);
  expect(l).toMatchSnapshot();
});
test("computeTables: tables", async () => {
  expect.assertions();
  let l = await testFunctions.computeTables(testInfo);
  expect(l).toMatchSnapshot();
});
test.only("computeTables: Attach", async () => {
  expect.assertions();
  let l = await testFunctions.computeDSAttach(testInfo);
  expect(l).toMatchSnapshot();
});

