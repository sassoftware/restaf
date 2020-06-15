let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});
test("List repositories", async () => {
	expect.assertions();
	let l = await testFunctions.modelRepoRoot(testInfo);
	expect(l).toMatchSnapshot();
});
test.only('Create CAS Destination', async () => {
	expect.assertions();
	let l = await testFunctions.modelDestinationCas(testInfo);
	expect(l).toMatchSnapshot();
});
