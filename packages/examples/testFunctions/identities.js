
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


module.exports = async function identities ( testInfo ) {
	let { store, logger } = testInfo;
	let { identities } = await store.addServices( 'identities' );
	let c = await store.apiCall( identities.links( 'currentUser' ) );
	logger.info( c.items() );
	let a = await store.apiCall( identities.links( 'currentUserAdmin' ) );
	logger.info( a.items() );
    return 'done';
};
