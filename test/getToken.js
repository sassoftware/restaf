/*
 * Copyright © 2025, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let fs = require('fs'); 
let os = require('os'); 
let  path = require('path');

module.exports = async function getToken() {
  let homedir = os.homedir();

  if (process.env.SAS_CLI_CONFIG) {
    homedir = process.env.SAS_CLI_CONFIG;
  }

  let sep = (os.platform() === 'win32') ? '\\' : '/';
  let credentials = homedir + sep + '.sas' + sep + 'credentials.json';
  let url = homedir + sep + '.sas' + sep + 'config.json';
  try {
    let j = fs.readFileSync(credentials, 'utf8');
    let js = JSON.parse(j);
    let profile = (process.env.SAS_CLI_PROFILE) ? process.env.SAS_CLI_PROFILE : 'Default';
    let refresh_token = js[profile]['refresh-token'];
    j = fs.readFileSync(url, 'utf8');
    js = JSON.parse(j);
    let host = js[profile]['sas-endpoint'];

    let token = await refreshToken(refresh_token, host);
    return { host, token };
  } catch (e) {
    throw 'Error reading or parsing credentials/config file: ' + e;
  }
  async function refreshToken(token, host) {
    const url = `${host}/SASLogon/oauth/token`;
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token,
      client_id: 'sas.cli'
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });

      if (!response.ok) {
        const error = await response.text();
        console.log('Error refreshing token: ', error);
        throw new Error(error);
      }

      const data = await response.json();
      return data.access_token;
    } catch (err) {
      console.log('Error refreshing token: ', err);
      throw err;
    }
  }

}

