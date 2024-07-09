/**
 * connecting to SAS Viya 
 * @typedef {object} logonPayload
 * @property {string} authType - code|token|implicit
 * @property {URL} host - host url
 * @property {string} clientID - client id (if authType is implicit)
 * @property {string} redirectUri - redirect uri (if authType is implicit)
 * @property {string} token - token (if authType is token)
 * @property {string} tokenType - bearer(if authType is token)
 * 
 */

/**
 * control object for restafedit
 * @typedef {object} appEnv
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
 * @typedef {object} dataCache
 * @property {array} rows - rows
 * @property {array} schema - schema
 */
 
/** 
 * current state of the fetched data
 * @typedef {object} state
 * @property {dataCache} cache - cache object
 * @property {array} modified - modified rows
 * @property {object} pagination - pagination object
 * @property {array} scrollOptions - scroll options
 * @property {array} data - data
 * @property {object} columns - columns
 * @property {object} tableSummary - table summary
 */

/**
 * request object
 * @typedef {object} appControl
 * @property {string} description
 * @property {string} source - cas|compute|none
 * @property {Table} table - table name
 * @property {array} byvars - by variables
 * @property {fetchQuery} initialFetch
 * @property {object} customColumns - custom columns
 * @property {string} preamble - preamble
 * @property {object} editControl - edit control
 * @property {object} editControl.handlers - edit control handlers
 * @property {boolean} editControl.autoSave - auto save
 * @property {object} appData - user app data(opaque)
 * 
 */

