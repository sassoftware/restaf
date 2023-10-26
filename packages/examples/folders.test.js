let testFunctions = require( "./testFunctions" );
let testInfo;
beforeAll( async () => {
	testInfo = await require( './lib/setupAll' )();
} );

test( 'folders - paginate thru folders', async () => {
	expect.assertions();
	let l = await testFunctions.foldersPaginate( testInfo );
	expect( l ).toMatchSnapshot();
} );