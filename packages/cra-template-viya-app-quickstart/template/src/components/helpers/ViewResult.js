import React, { Fragment} from 'react';
import { PropTypes } from 'prop-types';
import WrapAceEditor from './WrapAceEditor';


/**
 * Display Spre log or list
 * @param {} props 
 */
function ViewResult (props) {
	let { result, mode} = props;

	let docInfo = { doc: (typeof result === 'object') ? JSON.stringify(result, null, 4) : result };
	let show = <Fragment>
		<WrapAceEditor currentDoc={docInfo} mode={mode}/>
        </Fragment>;
    return show;
    
}

ViewResult.propTypes = {
	/** Control information for this casl run */
	result: PropTypes.any.isRequired,
	/**restaf store */
	mode  : PropTypes.string.isRequired
};
export default ViewResult;
