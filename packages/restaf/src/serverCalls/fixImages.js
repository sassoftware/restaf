/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
  'use strict';
module.exports = function fixImages ( response ) {
  if ( response.data.results.hasOwnProperty( "images" ) === true ) {
    let images = response.data.results.images;
    let items =
      Array.isArray( images ) === true
        ? [].concat( images )
        : Object.assign( {}, images );
    items[0].id = "image";
    response.data.results.items = items;
    delete response.data.results.images;
  }
};
