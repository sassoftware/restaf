/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function typeValidation(type) {
  const stringTypes = ["char", "string", "varchar", "varbinary"];
  const numberTypes = ["decimal", "number", "double", "float"];
  const intTypes = ["int", "integer", 'int64'];
  const booleanTypes = ['boolean'];

  let r = type;
  if (type == null) {
    r = 'number';
  } else if (stringTypes.includes(type)) {
    r = 'string';
  } else if (numberTypes.includes(type)) {
    r = 'number';
  } else if (intTypes.includes(type)) {
    r = 'int';
  } else if (booleanTypes.includes(type)) {
    r = 'boolean';
  }

  return r;
}
export default typeValidation;
