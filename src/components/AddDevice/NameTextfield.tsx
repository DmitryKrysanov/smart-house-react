import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
    setName: (name: string) => void,
    handleIsNameError: (error: boolean) => void,
    isNameError: boolean
}

const NameTextfield = (props: Props) => {
    const [name, setName] = useState('');

    const handleNameChange = (event: { currentTarget: { value: string; }; }) => {
        setName(event.currentTarget.value)
    }

    const validateName = () => {
        if (name.length < 2) {
            props.handleIsNameError(true)
        } else {
            props.setName(name)
            props.handleIsNameError(false)
        }
    }

    return (
        <TextField
            required
            fullWidth={true}
            type='text'
            value={name}
            name='name'
            label="Name"
            color='secondary'
            helperText={props.isNameError ? 'Wrong device name' : ''}
            onBlur={validateName}
            error={props.isNameError}
            onChange={handleNameChange} />
    );
}

export default NameTextfield;