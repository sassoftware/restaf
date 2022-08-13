let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});
test.only("computeService: basic", async () => {
  expect.assertions();
  let l = await testFunctions.computeDS(testInfo);
  expect(l).toMatchSnapshot();
});
test("computeTables: tables", async () => {
  expect.assertions();
  let l = await testFunctions.computeTables(testInfo);
  expect(l).toMatchSnapshot();
});