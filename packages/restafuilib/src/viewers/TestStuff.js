import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

function TestStuff (props) {
	let { name } = useParams();
	let show = (
		<div>
			
			<pre> {name + JSON.stringify(props, null, 4)} </pre>
		</div>
	);
	return show;
}

export default TestStuff;
