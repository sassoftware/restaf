"use strict";

require("core-js/modules/es6.object.assign");

/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
module.exports = function fixImages(response) {
  if (response.data.results.hasOwnProperty("images") === true) {
    var images = response.data.results.images;
    var items = Array.isArray(images) === true ? [].concat(images) : Object.assign({}, images);
    items[0].id = "image";
    response.data.results.items = items;
    delete response.data.results.images;
  }
};