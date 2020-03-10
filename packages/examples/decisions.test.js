let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});
test("List repositories", async () => {
  let l = await testFunctions.modelRepoRoot(testInfo);
  expect(l).toMatchSnapshot();
});
test('Create CAS Destination', async () => {
	let l = await testFunctions.modelDestinationCas(testInfo);
	expect(l).toBe('done');
});
