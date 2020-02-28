let testFunctions = require("./testFunctions");

test("computeService: basic", async () => {
  let l = await testFunctions.filesCreate();
  expect(l).toMatchSnapshot();
});


test('computeService: basic', async () => {
	let l = await testFunctions.filesPaginate();
	expect(l).toMatchSnapshot();
});