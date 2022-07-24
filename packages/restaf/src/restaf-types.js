/**
 * restaf store.
 * @typedef {object} restafStore
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

 /**
 * Links reduced by restaf
 * @typedef {object} rafLinkRel
 */

 /**
 * Link for specific rel
 * @typedef {object} rafLink
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
