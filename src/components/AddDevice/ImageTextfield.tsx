import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {

    setImageURL: (url: string) => void,
    handleIsImageError: (error: boolean) => void,
    isImageError: boolean
}

const ImageField = (props: Props) => {
    const [imageURL, setImageURL] = useState('');

    const handleImageURLChange = (event: { currentTarget: { value: string; }; }) => {
        setImageURL(event.currentTarget.value)
    }

    const validateImageURL = () => {
        //props.setImageURL(imageURL)
        if (imageURL.length < 5) {
            props.handleIsImageError(true)
        } else {
        props.setImageURL(imageURL)
            props.handleIsImageError(false)
        }
}



return (
    <TextField
        fullWidth={true}
        type='text'
        value={imageURL}
        name='imageURL'
        label="Image URL"
        color='secondary'
        helperText={props.isImageError ? 'Incorrent image link' : ''}
        onBlur={validateImageURL}
        error={props.isImageError}
        onChange={handleImageURLChange} />
);
}

export default ImageField;