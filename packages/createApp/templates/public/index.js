module.exports = function index (appName, scriptTag, title) {
    
    let ht = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#000000">
                <title>${title}</title>
                <script type="text/javascript" src="/${appName}/appenv"></script>
                <script async src="https://unpkg.com/@sassoftware/va-report-components@0.6/dist/umd/va-report-components.js"></script>
                ${scriptTag}
            </head>
            <body>
                <script>
                   window.appOptions = {appEnv: APPENV, logonPayload: LOGONPAYLOAD};
                </script>
                <div id="root">
                </div>
            </body>
        </html>
    `;
    return ht;
}