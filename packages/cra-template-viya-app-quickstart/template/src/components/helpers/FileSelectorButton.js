import React, { createRef, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import FolderOpen from '@material-ui/icons/FolderOpen';
import Button from '@material-ui/core/Button';
import {useAppContext} from '../../providers';

/**
 * Prompts user to select a file
 * @param {*} props
 */

function FileSelectorButton (props) {
    let { label, onSelect} = props;
    let {classes} = useAppContext();
    let inputRef = createRef(null);
    const _focusTextInput = () => inputRef.current.click();  //.click() passes the value of inputref.current as a click() event

    const _handleData = () => {
          
        let file = inputRef.current.files[0];
        if (file == null) {
            if (onSelect !== null) {
                onSelect(null, null, null);
            }
        } else {
            let fname = file.name;
            let reader = new FileReader();

            reader.onload = (evt) => {
                if (onSelect !== null) {
                    onSelect(evt.target.result, fname, file);
                    if (inputRef.current !== null) {
                        inputRef.current.value = '';
                    }
                }
            };
            inputRef.current.value = '';
            reader.readAsText(file);
        }
    };

    let show = (
        <Fragment>
            <input type="file" id="file" ref={inputRef} style={{ display: 'none' }} onChange={_handleData} />
            <Button
                size="small"
                startIcon={<FolderOpen />}
                variant="outlined"
                className={classes.button}
                onClick={_focusTextInput}>
                {label == null ? 'Select file' : label}
            </Button>
            <br></br>
        </Fragment>
    );

    return show;
}

//buttion onClick gets the event object, contains the data, and then onChange will 'handle' the data
FileSelectorButton.propTypes = {
    /** Text for File Selector Button */
    label   : PropTypes.string.isRequired,
    /**
     * onSelect(data, name)
     *
     * data -- the selected file's content
     *
     * name - name of the selected file
     */
    onSelect: PropTypes.func.isRequired,

    /** classes */
    classes: PropTypes.object.isRequired,
};

export default FileSelectorButton;
