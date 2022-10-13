let testFunctions = require('../examples/testFunctions/casSession');
let setupAll = require('../examples/lib/setupAll');
let testInfo;
beforeAll(async () => {
	try {
		
		console.log('calling setup');
		testInfo = await setupAll();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
});

test('CAS Session', async () => {
	let r = await testFunctions(testInfo);
	expect(r).toBe('done');
});
