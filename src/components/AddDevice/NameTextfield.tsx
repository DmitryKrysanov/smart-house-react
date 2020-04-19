import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
    setName: (name: string) => void,
    handleIsError: (error: boolean) => void,
    isError: boolean
}

const NameTextfield = (props: Props) => {
    const [name, setName] = useState('');

    const handleNameChange = (event: { currentTarget: { value: string; };} ) => {
        setName(event.currentTarget.value)
    }

    const validateName = () => {
        if (name.length < 2) {
            props.handleIsError(true)
        } else {
            props.setName(name)
            props.handleIsError(false)
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
            helperText={props.isError ? 'Wrong device name' : ''}
            onBlur={validateName}
            error={props.isError}
            onChange={handleNameChange} />
    );
}

export default NameTextfield;