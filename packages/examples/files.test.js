let testFunctions = require("./testFunctions");

test("files: create and retrieve content", async () => {
  let l = await testFunctions.filesCreate();
  expect(l).toMatchSnapshot();
});


test('files - paginate thru files', async () => {
	let l = await testFunctions.filesPaginate();
	expect(l).toMatchSnapshot();
});