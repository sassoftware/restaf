module.exports = function dev (appName) {
    let ht = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">

        
            <!-- App specific functions -->
            
            <script type="text/javascript" src="/${appName}/appenv"></script>
            <script>
            function setup() {
                let url = window.location.protocol + '//' + window.location.host + '/' + LOGONPAYLOAD.appName + '/develop';
                window.location.replace(url);
            }
            </script>
        </head>

        <body onload="setup()">
            <h1 id="head"></h1>
        </body>

    </html>
    
    `
    return ht;
}