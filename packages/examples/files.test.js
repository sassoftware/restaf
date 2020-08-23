let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});
test("files: create and retrieve content", async () => {
	expect.assertions();
    let l = await testFunctions.filesCreate(testInfo);
    expect(l).toMatchSnapshot();
});


test.only('files - paginate thru files', async () => {
	expect.assertions();
	let l = await testFunctions.filesPaginate(testInfo);
	expect(l).toMatchSnapshot();
});