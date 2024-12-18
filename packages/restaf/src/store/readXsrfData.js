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
function readXsrfData(headers, service, iroute) {
  let xsrfData = {
    serviceName: service,
    iroute: iroute,
    'x-csrf-header': null,
    'tkhttp-id': null
  }
  let xheader = headers( 'x-csrf-header' )
  xsrfData['x-csrf-header'] = xheader;
  // xsrf data is present
  if (xheader != null) {
    xsrfData[xheader] = headers( xheader.toLowerCase() );
  }
  // save tkhtt-id for cas use
  xsrfData['tkhttp-id'] = (headers('tkhttp-id') != null) ? headers('tkhttp-id') : null;
  return xsrfData;
}
export default readXsrfData;