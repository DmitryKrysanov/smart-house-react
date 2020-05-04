import React from 'react';
import Chip from '@material-ui/core/Chip';
import style from './Chips.module.scss';

interface Props {
    modes: string[],
    handleModeDelete: (mode: string) => void
}
const Chips = (props: Props) => {
        return (
            <div>
                {props.modes.map((mode: string, index: number) => (
                    <Chip key={index} 
                    className={style.chip__item} 
                    label={mode} 
                    onDelete={() => props.handleModeDelete(mode)} />
                    ))}
            </div>
        );
}

export default Chips;