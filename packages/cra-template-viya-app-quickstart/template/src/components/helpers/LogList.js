import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import {useAppContext} from '../../providers';

/**
 * Display SPRE log or list
 * @param {} props 
 */
function LogList (props) {
	let { computeInfo, type, classes} = props;
	let {store, restaflib} = useAppContext();
	let {computeResults} = restaflib;
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
				let c = classes[`l${type}`];
				if (l.type === 'title') {
					out = (
						<h2 key={i} className={c}>
							{' '}
							{line}{' '}
						</h2>
					);
				} else {
					out = (
						<p key={i} className={c}>
							{' '}
							{line}{' '}
						</p>
					);
				}
				outAll.push(out);
			});
		
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
	/** Type is either log or listing - defaults to log if incorrect*/
	type       : PropTypes.string
};
export default LogList;


