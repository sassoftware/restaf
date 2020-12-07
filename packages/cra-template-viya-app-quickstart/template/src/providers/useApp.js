import {useContext} from 'react';
import AppContext from './AppContext';

function useApp() {
    const context = useContext(AppContext);
    return context;
}
export default useApp;