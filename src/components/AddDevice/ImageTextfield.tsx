import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
    setImageURL: (url: string) => void,
    handleIsError: (error: boolean) => void,
    isError: boolean
}

const ImageField = (props: Props) => {
    const [imageURL, setImageURL] = useState('');

    const handleImageURLChange = (event: { currentTarget: { value: string; };} ) => {
        setImageURL(event.currentTarget.value)
    }

    const validateImageURL = () => {
        props.setImageURL(imageURL)
        // if (imageURL.length < 5) {
        //     props.handleIsError(true)
        // } else {
        //     props.setName(name)
        //     props.handleIsError(false)
        // }
    }

    return (
        <TextField
            fullWidth={true}
            type='text'
            value={imageURL}
            name='imageURL'
            label="Image URL"
            color='secondary'
            // helperText={props.isError ? 'Incorrent image link' : ''}
            onBlur={validateImageURL}
            // error={props.isError}
            onChange={handleImageURLChange} />
    );
}

export default ImageField;