let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});

test('files - paginate thru folders', async () => {
	let l = await testFunctions.foldersPaginate(testInfo);
	expect(l).toMatchSnapshot();
});