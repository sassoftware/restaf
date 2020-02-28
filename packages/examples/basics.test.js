let testFunctions = require("./testFunctions");

test("logon and get root links", async () => {
  let s = [
    "reports",
    "reportImages",
    "reportTransforms",
    "compute",
    "files",
    "casManagement",
    "modelPublish",
    "jobExecution"
  ];
  let l = await testFunctions.addServices(s);
  expect(l).toMatchSnapshot();
});
