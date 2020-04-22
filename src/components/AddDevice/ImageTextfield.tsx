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
        const start1 = 'https://';
        const start2 = 'http://';
        const end1 = '.png';
        const end2 = '.jpg';

        if ((imageURL.includes(start1) || imageURL.includes(start2))
            && (imageURL.includes(end1) || imageURL.includes(end2))) {
            props.setImageURL(imageURL)
            props.handleIsImageError(false)
        } else {
            props.handleIsImageError(true)
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