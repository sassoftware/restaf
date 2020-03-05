let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
	testInfo = await require('./lib/setupAll')();
});
test("logon and get root links", async () => {
  let s = [
    "reports",
    "reportImages",
    "reportTransforms",
    "compute",
    "files",
    "casManagement",
    "modelPublish",
    "modelRepository",
    "jobExecution"
  ];
  let l = await testFunctions.addServices(s,testInfo);
  expect(l).toMatchSnapshot();
});
