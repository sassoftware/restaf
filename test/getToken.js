
module.exports = function getToken(){
  let fs = require('fs');
  let j = fs.readFileSync(process.env.TOKENFILE + '/credentials.json', 'utf8');
  let js = JSON.parse(j);
  let token = js.Default['access-token'];
  return token;
}