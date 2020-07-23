module.exports = function devServer(appName) {
  
    let code = `
let restafServer = require ('@sassoftware/restaf-server');
restafServer.icli (getCustomHandler());

function getCustomHandler () {
    let handler = [
		{
			method: ['GET'],
			path  : '/${appName}/develop',
			config: {
				auth   : false,
				cors   : true,
				handler: async (req, h) => {
                    const spawn = require('cross-spawn');
                    let child = spawn('yarn', ['start'],{stdio: 'inherit'})
                    let h2 = '<h2>Viya Server: ' + process.env.VIYA_SERVER + '<h2>';
                    return h2 + 
                                "<h3>Your session is authenticated</h3>" +
                                "<h3>Your application is starting in another tab </h3>" +
                                "<h4> HMR is active</h4>";
				}
        }
    }
    ];
    console.table(handler);
    return handler;
}
    `;
    return code;

}