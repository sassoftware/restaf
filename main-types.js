/**
 * @description Main
 */
/** 
* Initialize restaf instance
* @category restaf/core
*/
/** 
* Examples
* @category examples
*/
/**
* Cas functions
* @category restaf/cas
*/

/** 
* restaflib cas
* @category restaflib/cas
*/
/** 
* restaflib compute
* @category restaflib/compute
*/
/** 
* restaflib reports
* @category restaflib/report
*/
/** 
* restaflib MAS
* @category restaflibmas
*/

/** 
* restaflib Job Execution
* @category restaflib/jes
*/
/** 
* restaflib Utility
* @category restaflib/util
*/
/**
 * restaf store.
 * @typedef {object} store
*/

/**
* authflow 
* @typedef {"password"|"code"|"server"|"token"}  authflow
*/

/**
* authType 
* @typedef {"password"|"code"|"server"|"token"} authType
*/

/**
 * tokenType
 * @typedef {"bearer"} tokenType
 */
/**
 * Code logon payload
 * @typedef {object} logonPayloadCode
 * @property {"code"|"server"} authType
 * @property {URL} host
 * @property {string=} token Useful when CORS is set *
 * @property {tokenType=} bearer  
 */

 /**
 * Password logon payload
 * @typedef {object} logonPayloadPassword
 * @property {"password"} authType
 * @property {string} host
 * @property {string} user 
 * @property {string} password 
 * @property {string} clientID
 * @property {string} clientSecret
 */

/**
 * Token logon payload
 * @typedef {object}  logonPayloadToken
 * @property {"token"} authType
 * @property {string} host
 * @property {string} token  
 * @property {string} bearer  
 */

 /**
 * restaf links
 * @typedef {object} rafLink
 */

 /**
 * Link for a specific rel
 * @typedef {object} rafLinkRel
 */

 /**
 * restaf object
 * @typedef {object} rafObject
 */


// ######
// Cas arguments
// ######

/**
* payload for cas actions
* @typedef {object} actionPayload
* @property {string} actionName 
* @property {object} actionParameter
*/


 /**
 * computeSummary from computeSummary
 * @typedef {object} computeSummary
 */


/**
* Authflow 
* @typedef {"password"|"code"|"server"|"token"}  Authflow
*/

/**
* AuthType 
* @typedef {"password"|"code"|"server"|"token"} authType
*/

/**
 * Code logon payload
 * @typedef {object} logonPayloadCode
 * @property {"code"|"server"} authType
 * @property {URL} host
 * @property {string} token optional
 * @property {"Bearer"} bearer optional
 */

 /**
 * Password logon payload
 * @typedef {object} logonPayloadPassword
 * @property {"password"} authType
 * @property {string} host
 * @property {string} token optional
 * @property {string} bearer optional
 */

/**
 * Token logon payload
 * @typedef {object}  logonPayloadToken
 * @property {"token"} authType
 * @property {string} host
 * @property {string} token optional
 * @property {string} bearer optional
 */


// ######
// Cas arguments
// ######

/**
* payload for cas actions
* @typedef {object} actionPayload
* @property {string} actionName 
* @property {object} actionParameter
*/


 /**
 * computeSummary from computeSummary
 * @typedef {object} computeSummary
 */
