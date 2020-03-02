let testFunctions = require("./testFunctions");

test("computeService: basic", async () => {
  console.log(testFunctions.computeDS);
  let l = await testFunctions.computeDS();
  expect(l).toMatchSnapshot();
});
