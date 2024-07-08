/**
 * logonPayload object for SAS Viya 
 * @typedef {object} logonPayload - information set in setupAssistant config
 * @property {string} authType - code|token|implicit
 * @property {URL} host - host url
 * @property {string} clientID - client id (if authType is implicit)
 * @property {string} redirectUri - redirect uri (if authType is implicit)
 * @property {string} token - token (if authType is token)
 * @property {string} tokenType - bearer(if authType is token)
 * 
 */

/**
 * viyaEnv object
 * @typedef {object} viyaEnv - viya session control object
 * @property {string} host - url to viya server
 * @property {logonPayload} logonPayload - logonPayload - passed in to setupAssistant
 * @property {string} source - cas|compute|none
 * @property {string} sessionID - session id if source is cas or compute
 * @property {object} session - session object(for restaf users) if source is cas or compute
 * @property {object} servers - servers object(for restaf users) if source is cas or compute
 * @property {object} serverName - compute context or cas server name
 * @property {object} store - restaf store object(for restaf users)
 * @property {object} restaflib - restaflib object(for restaf users)
 * @property {object} restafedit - restafedit object(for restaf users)
*/
/**
 * appEnv - main control object for restafedit
 * 
 * @typedef {object} appEnv - main control object for restafedit
 * @property {string} source - cas|compute|none
 * @property {Table} table - table object| null
 * @property {array} byvars - by variables
 * @property {object} userData - user data
 * @property {string} user - user name
 * @property {number} fetchCount - number of rows to fetch
 * @property {object} store - restaf store object
 * @property {object} session - session object
 * @property {object} servers - servers object
 * @property {string} sessionID - session id
 * @property {string} userSessionID - user session id
 * @property {object} userFunctions - user functions
 * @property {string} casServerName - cas server name
 * @property {string} computeContext - compute context
 * @property {logonPayload} logonPayload - logonPayload
 * @property {appControl} appControl - appControl
 * @property {string} activeWhere - active where clause
 * @property {object} builtins - builtins
 * @property {state} state - state object
 * @property {string} id - id
 */

/**
 * dataCache object
 * @typedef {object} dataCache - cache object
 * @property {array} rows - rows
 * @property {array} schema - schema
 */
 
/** state - current state of the fetched data
 * @typedef {object} state - current state of the fetched data
 * @property {dataCache} cache - cache object
 * @property {array} modified - modified rows
 * @property {object} pagination - pagination object
 * @property {array} scrollOptions - scroll options
 * @property {array} data - data
 * @property {object} columns - columns
 * @property {object} tableSummary - table summary
 */

/**
 * appControl object
 * @typedef {object} appControl - control object
 * @property {string} description
 * @property {Table} table - table name
 * @property {array} byvars - by variables
 * @property {object} customColumns - custom columns
 * @property {object} editControl - edit control
 * @property {initialFetch} initialFetch - initial fetch
 * @property {object} appData - user app data(opaque)
 * 
 */