import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { computeResults } from '@sassoftware/restaflib/dist/restaflib.js';

/**
 * Display Spre log or list
 * @param {} props 
 */
function LogList (props) {
      let { store, computeInfo, type} = props;

		let [ log, setLog ] = useState('');
		
	

	useEffect(() => {
			const _logLines = (logl) => {
				let outAll = [];
				logl.forEach((l,i) => {
					let line = l.line;
					if (line.length === 0) {
						line = '  ';
					}
					let out;
					if (l.type === 'title') {
						out = (
							<h2 key={i} className={'l'+type}>
								{' '}
								{line}{' '}
							</h2>
						);
					} else {
						out = (
							<p key={i} className={'l'+type}>
								{' '}
								{line}{' '}
							</p>
						);
					}
					outAll.push(out);
				});
				console.log(outAll);
				return outAll;
			};

			const _format = async () => {
				let tlog = await computeResults(store, computeInfo.result, (type === 'listing) '? 'listing' : 'log'));
				return _logLines(tlog);
			};
			if (computeInfo.result !== null) {
				_format()
					.then((r) => setLog(r))
					.catch((err) => console.log(err));
			}

			// eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ computeInfo ]);

		return (
			<Fragment>
				{log}
			</Fragment>
		);
    
}


LogList.propTypes = {
	/** Control information for this compute session */
	computeInfo: PropTypes.object.isRequired,
	/**restaf store */
	store      : PropTypes.object.isRequired,
	/** Type is either log or listing - defaults to log if incorrect*/
	type       : PropTypes.string
};
export default LogList;


