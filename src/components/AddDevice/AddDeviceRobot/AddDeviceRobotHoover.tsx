import React, { Component } from 'react';
import { AddSagaRobotAction } from '../../../redux/actions/deviceActions/deviceActions';
import style from './AddDeviceRobotHoover.module.scss';
import Button from '@material-ui/core/Button';
import { PostRobot } from '../../../api/api';
import AddModes from '../AddModes/AddModes';
import NameTextfield from '../NameTextfield/NameTextfield';
import ImageTextfield from '../ImageTextfield/ImageTextfield';

interface State {
    device: PostRobot,
    errors: {
        isNameError: boolean,
        isImageError: boolean
    }
}

interface Props {
    handleToggleDialog: () => void,
    //  addDevice: (p: RobotHoover) => AddDeviceAction,
    handleContent: (count: number) => void,
    addSagaRobot: (p: PostRobot) => AddSagaRobotAction,
    alert: string
}

class AddDeviceRobot extends Component<Props, State> {
    public state: State = {
        device: {
            category: 'robot-hoover',
            name: '',
            image: 'https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png',
            status: false,
            modes: [],
            currentMode: ''
        },
        errors: {
            isNameError: false,
            isImageError: false
        }
    }

    private _form = React.createRef<HTMLFormElement>();

    private setName = (name: string): void => {
        this.setState({
            ...this.state,
            device: {
                ...this.state.device,
                name: name
            }
        })
    }

    private setImageURL = (url: string): void => {
        this.setState({
            ...this.state,
            device: {
                ...this.state.device,
                image: url
            }
        })
    }

    private handleModeAdd = (mode: string): void => {
        this.setState({
            device: {
                ...this.state.device,
                modes: [...this.state.device.modes, mode]
            }
        })
    }

    private handleModeDelete = (mode: string): void => {
        const { modes } = this.state.device;
        const newModes = modes;
        const index: number = modes.indexOf(mode);
        newModes.splice(index, 1);
        this.setState({
            device: {
                ...this.state.device,
                modes: newModes
            }
        })
    }

    handleIsNameError = (error: boolean) => {
        this.setState({
            errors: {
                ...this.state.errors,
                isNameError: error
            }
        })
    }

    handleIsImageError = (error: boolean) => {
        this.setState({
            errors: {
                ...this.state.errors,
                isImageError: error
            }
        })
    }

    private onSubmit = async (event: { preventDefault: () => void; }): Promise<void> => {
        event.preventDefault();
        this.props.addSagaRobot(this.state.device);
        setTimeout(() => {
            if (this.props.alert.length === 0) {
                this.props.handleToggleDialog();
            }
        }, 500)
    }

    render() {

        const { name, modes } = this.state.device;

        return (
            <div className={style.add_device_dialog__inner}>
                <h5>Add Device (Robot Hoover)</h5>
                <form className={style.form} ref={this._form}>
                    <div className={style.general}>
                        <div className={style.row}>
                            <NameTextfield setName={this.setName}
                                handleIsNameError={this.handleIsNameError}
                                isNameError={this.state.errors.isNameError} />
                        </div>
                        <div className={style.row}>
                            <ImageTextfield setImageURL={this.setImageURL}
                                handleIsImageError={this.handleIsImageError}
                                isImageError={this.state.errors.isImageError} />
                        </div>
                    </div>
                    <div className={style.row}>
                        <AddModes
                            modes={modes}
                            handleModeAdd={this.handleModeAdd}
                            handleModeDelete={this.handleModeDelete} />
                    </div>
                    <div className={style.action_buttons}>
                        <Button color="secondary" onClick={() => this.props.handleContent(0)}>Back</Button>
                        <div>
                            <Button color="secondary" onClick={this.props.handleToggleDialog}>Cancel</Button>
                            <Button
                                className={style.right}
                                color="secondary"
                                type='submit'
                                disabled={!name || this.state.errors.isImageError || this.state.errors.isNameError}
                                onClick={this.onSubmit}>Add Device</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddDeviceRobot;