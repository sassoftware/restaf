let testFunctions = require("./testFunctions");
let testInfo;
beforeAll(async () => {
  try {
    testInfo = await require('./lib/setupAll')();
  }
  catch (err) {
    console.log(err);
    process.exit();
  }
});
test("logon and get root links for default services", async () => {
  let s = process.env.DEFAULT_VIYA_SERVICES.split(',').map(s1 => {
    return s1.trim();
  });
  let l = await testFunctions.addServices(s, testInfo);
  expect(l).toMatchSnapshot();
});
test('logon and get root links for VIYA_SERVICES env variable', async () => {
  if (process.env.VIYA_SERVICES != null) {
    let s = process.env.VIYA_SERVICES.split(',').map(s1 => {
      return s1.trim();
    });
    let l = await testFunctions.addServices(s, testInfo);
    expect(l).toEqual(s);
  }
});