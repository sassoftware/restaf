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
