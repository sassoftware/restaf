let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});
test("computeService: basic", async () => {
  let l = await testFunctions.computeDS(testInfo);
  expect(l).toMatchSnapshot();
});
