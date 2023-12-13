/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/

 /**
  * @description Reduce the job information into consummable form(async)
  * 
  * @async
  * @module computeSummary
  * @category restaflib/compute
  * 
  * @param {store} store - restaf store
  * @param {rafObject} session - compute Session
  * @param {rafObject} job - rafObject representing the compute service job after job completion
  * @param {object|Array=} tables (see computeSetupTables)
  * @returns {promise} - the computeSummary object for easy handling of logs,listing,ods, tables
  * 
  */
async function computeSummary ( store, session, job, tables ){
    
    let result;
    if ( job != null && tables == null ) {
        result = await jobResults( store, session, job );
    }  else {
        result = await isetupTable( store, session, tables )
    }
    return result;
}

async function jobResults( store, session, job ) {
    let cResult = {
        session: session,
        log    : null,
        listing: null,
        ods    : null,
        job    : job /*null*/,
        tables : {},
        files  : {}
    };
    cResult.log     = job.links( 'log' );
    cResult.listing = job.links( 'listing' );
    let reportLink  = job.links( 'results' );
    if ( reportLink !== null ) {
        let results = await store.apiCall( reportLink );
        let size = results.itemsList().size; 
        if ( size > 0 ) {
            for ( let i = 0 ; i < size; i++ ) {
                let resultItem = results.itemsList( i );
                let type = results.items( resultItem, 'data', 'type' ).toLowerCase();
                if ( type === 'ods' ) {
                    cResult['ods'] = results.itemsCmd( resultItem, 'self' );
                } else if ( type === 'table' ) {
                    let r= {
                        self   : results.itemsCmd( resultItem, 'self' ),
                        current: null
                    };
                    cResult.tables[resultItem.toUpperCase()] = r;
                } else if( type === 'file' ){
                    let r= {
                        self   : resultItem,
                        current: null,
                        data   : null
                    };
                    cResult.files[resultItem] = r;
                } else {
                    let r = {
                        self   : resultItem,
                        current: null,
                        data   : null
                    };
                    cResult[type] = r;
                }
            }
        }
    }

return cResult;
}

async function isetupTable( store, session, tables ) {
    
    let cResult = {
        session: session,
        log    : null,
        listing: null,
        ods    : null,
        job    : null,
        tables : {},
        files  : {}
    };
    
    let tableList = ( typeof tables === 'object' ? [ tables ] : tables );
    
    for ( let i=0; i < tableList.length ; i++ ) {
        let itable = tableList[i];
        let libref = itable.libref.toUpperCase();
        let name   = itable.name.toUpperCase();
        
        let p = {
            qs: { filter: `eq(name,'${libref}')`}
        };
        
        let currentLibrefs = await store.apiCall( session.links( 'librefs' ), p );
        
        if ( currentLibrefs.itemsList().size === 0 ) {
            throw `ERROR: Libref ${libref} not found`;
        }
        // get the links for this libref
        let rlink = currentLibrefs.itemsCmd( libref, 'self' );
        let currentLibrefSelf = await store.apiCall( rlink );
        
        // get the table
        p = {
          qs: { filter: `eq(name,'${name}')`}
        };
        let tables = await store.apiCall( currentLibrefSelf.links( 'tables' ), p );

        if ( tables.itemsList().size === 0 ) {
            throw `ERROR: Table ${name} not found`;
        }
        let tname = `${libref}.${name}`.toLowerCase();
        let r= {
            self   : tables.itemsCmd( name, 'self' ),
            current: null
        };
        cResult.tables[tname.toUpperCase()] = r;
    }
    return cResult;
}

export default computeSummary;
