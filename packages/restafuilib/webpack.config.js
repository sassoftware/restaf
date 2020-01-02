/*
 *  ------------------------------------------------------------------------------------
 *  Copyright (c) SAS Institute Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  You may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

"use strict";

let path = require("path");
/*
let webpack = require( 'webpack' );
let plugins = [];

plugins.push( new webpack.DefinePlugin( {
    'process.env.NODE_ENV': '"production"',
    'global'              : {}
} ) );
*/

module.exports = {
  entry: [ "./src/index.js" ],
  mode : "development",

  output: {
    path         : path.resolve(__dirname, "dist"),
    filename     : "restafuilib.js",
    library      : "restafuilib",
    libraryTarget: "umd"
  },


  externals: {
    "restaflib": "restaflib",
    "react"    : "React",
    "react-dom": "ReactDOM",
    "axios"    : "axios"
  },
  

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      { test: /\.svg$/, use: "raw-loader" },
      { test: /\.css$/, use: [ "style-loader", "css-loader" ] }
    ]
  }
};
