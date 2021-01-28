let testFunctions = require('./testFunctions');
let testInfo;
let setupAll = require('./lib/setupAll');
beforeAll(async () => {
	try {
		debugger;
		console.log('calling setup');
		testInfo = await setupAll();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
});
test('logon and get root links for default services', async () => {
	let sall =
		process.env.DEFAULT_VIYA_SERVICES != null
			? process.env.DEFAULT_VIYA_SERVICES
			: 'casManagement';
	
	let sa = sall.split(',').map((s1) => {
		return s1.trim();
	});
	let s = sa.map((s1) => {
		return s1.trim();
	});

	let l = await testFunctions.addServices(s, testInfo);
	expect(l).toMatchSnapshot();
});

test('logon and get root links for VIYA_SERVICES env variable', async () => {
	
	// expect.assertions();
	if (process.env.VIYA_SERVICES != null) {
		let s = process.env.VIYA_SERVICES.split(',').map((s1) => {
			return s1.trim();
		});
		let l = await testFunctions.addServices(s, testInfo);
		expect(l).toBe('done');
	}
});
