/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA. *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

"use strict";

// Pagination

module.exports = async function foldersPaginate ( testInfo ) {

  let { store, logger } = testInfo;
  let { folders } = await store.addServices( "folders" );
  let path = 'editorConfig'
  let payload = {
    qs: {
      filter: `eq(name,"sastest1")`
    }
  }

  console.log( payload );
  let folderList = await store.apiCall( folders.links( "folders" ), payload );
  if ( folderList.itemsList().size === 0 ) {
    throw 'USERS folder not found';
  }
  payload = {
    qs: {
      filter: `eq(name,"sastest1")`
    }
  }
  console.log( '---- editorfolder info' );

  console.log( folderList.items( 'sastest1', 'data' ).toJS() );
  console.log( folderList.items( 'sastest1', 'data', 'id' ) );
 
  let parentFolder = '/folders/folders/' + folderList.items( 'sastest1', 'data', 'id' );
  console.log( parentFolder );
  /*
  console.log(folderList.items(folder.itemsList(0)).toJS());
  console.log(Object.keys(folderList.links().toJS()));
  */

  let r = await createFile( store, 'editabc2', parentFolder );
  console.log( r )
  return "done";
};
async function createFile ( store, uname, parentFolder ) {
    let { files } = await store.addServices( 'files' );
    let name = uname + '.editorconfig.js';
    let payload = {
        data   : { me: 'hi there'},
        headers: {
            // 'Content-Disposition': `inline; form-data; filename=${name} name=${name}`,
            'Content-Disposition': `text/plain`,
            'content-type'       : `text/javascript`
        },
        qs: {
          parentFolderUri: parentFolder,
          parentUri      : parentFolder,
          versioned      : true,
          documentType   : 'editorConfig'

        }
    };
    //create a file
    let createCmd = files.links( 'create' );
    let newFile = await store.apiCall( createCmd, payload );
    console.log( newFile.items().toJS() );
    let c = await store.apiCall( newFile.links( 'content' ) );
    console.log( c.items().toJS() );
    let uri = newFile.links( 'self', 'link', 'uri' );
    console.log( uri );
  
    // set name and other attributes
    let p = {
        data: {
            name           : name,
            description    : 'stuff',
            parentFolderUri: parentFolder,
            parentUri      : parentFolder,
            properties     : {
                documentType: 'restaftest'
            },
            documentType: "devastuff"
        },
        headers: {
            'if-unmodified-since': newFile.headers( 'last-modified' )
        }
    }
    console.log( p );
    console.log( 'after update' );

    let updated = await store.apiCall( newFile.links( 'update' ), p );
    console.log( updated.items().toJS() );

    p = {
       qs: {
      //  filter: `and(contains(name, "editorconfig.js"),eq(parentUri,"${parentFolder}"))`
          filter: `eq(documentType, "devaStuff")`
       }
    };
    console.group( p );
    let selection = await store.apiCall( files.links( 'files' ), p );
    console.log( selection.itemsList().toJS() );

    return 'done';
  }

