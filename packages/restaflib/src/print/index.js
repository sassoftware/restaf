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

import Immutable    from 'immutable';
import errColors    from './errColors';
import stdColors    from './stdColors';
import titleColors  from './titleColors';
import casTable     from './casTable';
import logListLines from './logListLines';


import prettyjson from 'prettyjson';

function errMsg ( msg ) {
	let msg1 = typeof msg === 'object' ? msg : { Error: msg };
	console.log( prettyjson.render( msg1, errColors ) );
}

function msg ( msg, title ) {
	if ( title ) {
		titleLine( title );
	}
	console.log( prettyjson.render( msg, stdColors ) );
}

function titleLine ( msg ) {
	console.log( ' ','\n=======================================' );
	console.log( prettyjson.render( { title: msg }, titleColors ) );
	console.log( ' ','=======================================\n' );
}

function result ( f, title ) {
	if ( f.itemsList().size > 0 ) {
		itemsList( f, `${title}: ItemList` );
	}
	if ( f.links().size > 0 ) {
		links( f, `${title}: links` );
	}
	if ( f.items() !== null ) {
		items( f, `${title}: items` );
	}
}

function itemsList ( f, title ) {
	titleLine( `${title}  size: ${f.itemsList().size}` );
	if ( f.itemsList().size > 0 ) {
		object( f.itemsList().toJS() );
	} else {
		object( { info: 'List is empty' } );
	}
}

function links ( f, title ) {
	titleLine( `${title}  size:  ${f.links().size}` );
	f.links().forEach( ( l, k ) => {
		object( { rel: k } );
	} );
}

function itemsCmd ( f, name,title ) {
	titleLine( `${title}  size:  ${f.itemsCmd( name ).size}` );
	f.itemsCmd( name ).forEach( ( l, k ) => {
		object( { rel: k } );
	} );
}
function items ( f, title ) {
	titleLine( `${title}  size:  ${itemsList.size}` );
	object( f.items().toJS() );
}
function object ( d, title ) {
	let d1 = Immutable.Iterable.isIterable( d )
		? d.toJS()
		: ( typeof d === 'object' ) || Array.isArray( d )
		? d
		: { value: d };
	print( d1, title );
}

function print ( msg, title ) {
	if ( title ) {
		titleLine( title );
	}
	console.log( ( prettyjson.render( msg, stdColors ) ) );
}

export default {
	result,
	itemsList,
	links,
	items,
	itemsCmd,
	object,
	errMsg,
	msg,
	titleLine,
	casTable,
	logListLines,
};
