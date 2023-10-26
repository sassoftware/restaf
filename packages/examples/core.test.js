let testFunctions = require( './testFunctions' );
let testInfo;
beforeAll( async () => {
	try {
		testInfo = await require( './lib/setupAll' )();
	} catch ( err ) {
		console.log( err );
		process.exit( 1 );
	}
} );
test( 'identities service', async () => {
	let l = await testFunctions.identities( testInfo );
	expect( l ).toMatchSnapshot();
} );
