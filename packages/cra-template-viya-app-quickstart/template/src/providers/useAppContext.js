import {useContext} from 'react';
import AppContext from './AppContext';

function useAppContext() {
    const context = useContext(AppContext);
    return context;
}
export default useAppContext;