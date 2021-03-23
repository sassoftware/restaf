/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { useContext } from 'react';
import AppContext from './AppContext';

function useAppContext() {
	const context = useContext(AppContext);
	return context;
}
export default useAppContext;
