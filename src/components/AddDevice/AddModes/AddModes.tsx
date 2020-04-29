import React, { Fragment, useState } from 'react';
import style from './AddModes.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chips from '../Chips/Chips';

interface Props {
    modes: string[],
    handleModeAdd: (mode: string) => void,
    handleModeDelete: (mode: string) => void
}

const AddModes = (props: Props) => {

    const [mode, setMode] = useState('');

    const handleModeInputChange = (event: { currentTarget: { value: string; }; }): void => {
        if (event.currentTarget.value.trim() !== "") {
            setMode(event.currentTarget.value)
        }
    }

    const handleAddModeClick = () => {
        props.handleModeAdd(mode);
        setMode('')
    }


    return (
        <Fragment>
            <h6>Modes</h6>
            <div className={style.modes}>
                <div className={style.row}>
                    <TextField
                        fullWidth={true}
                        type='text'
                        name='image'
                        label='Mode'
                        color='secondary'
                        value={mode}
                        onChange={handleModeInputChange} />
                    <Button className={style.button}
                        variant="outlined"
                        color="secondary"
                        disabled={mode.length === 0 ? true : false}
                        onClick={handleAddModeClick}>
                        +
                        </Button>
                </div>
                <div className={style.chips}>
                    <Chips modes={props.modes} handleModeDelete={props.handleModeDelete} />
                </div>
            </div>
        </Fragment>
    );
}

export default AddModes;