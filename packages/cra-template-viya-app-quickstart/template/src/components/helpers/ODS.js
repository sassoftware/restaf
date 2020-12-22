import React, {Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import {useAppContext} from '../../providers';

function ODS (props) {
    let {computeInfo} = props;
    let {store, restaflib} = useAppContext();
    let {computeResults} = restaflib;
    let [ odsp, setODSp ] = useState('');

    useEffect(() => {
        const _format = async () => {
            let ods = await computeResults(store, computeInfo.result, 'ods');
            return ods;
        }
        if (computeInfo.result !== null) {
            _format()
                .then(r => setODSp(r))
                .catch(err => console.log(err))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ computeInfo ]);
    
    
 let html = { __html: odsp };

 return (
		<Fragment>
			<div dangerouslySetInnerHTML={html}></div>
		</Fragment>
 );
    
}
    

ODS.propTypes = {
/**store - restaf store */
    store      : PropTypes.object.isRequired,
/**computeInfo - control info from compute Session Info */
    computeInfo: PropTypes.object.isRequired
    
}
export default ODS;
