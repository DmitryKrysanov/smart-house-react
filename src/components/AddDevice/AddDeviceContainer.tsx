import React, { Component, Fragment } from 'react';
import AddDeviceOven from './AddDeviceOven/AddDeviceOven';
import AddDeviceRobot from './AddDeviceRobot/AddDeviceRobotHoover';
import style from './AddDeviceContainer.module.scss';
import { Oven, RobotHoover } from '../../redux/reducers/deviceReducer'
import { AddDeviceAction, FetchDevicesAction, AddSagaOvenAction, AddSagaRobotAction } from '../../redux/actions/deviceActions/deviceActions'
import SelectDevice from './SelectDevice/SelectDevice';
import { PostOven, PostRobot } from '../../api/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert/Alert';
import { AlertState } from '../../redux/reducers/alertReducer';
import { connect } from 'react-redux';
import { LoaderState } from '../../redux/reducers/loaderReducer';
import { Loader } from '../Loader/Loader';


interface Props {
    handleToggleDialog: () => void,
    addDevice: (p: Oven | RobotHoover) => AddDeviceAction,
    addSagaOven: (p: PostOven) => AddSagaOvenAction,
    addSagaRobot: (p: PostRobot) => AddSagaRobotAction
}

interface ConnectedProps {
    alert: string,
    isLoad: boolean
}

type ComponentProps = ConnectedProps & Props;

class AddDeviceContainer extends Component<ComponentProps> {

    public state = {
        content: 0
    }

    componentDidMount() {
        window.addEventListener("keyup", this.handleKeyUp, false);
        document.addEventListener("click", this.handleOutsideClick, false);
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.handleKeyUp, false);
        document.removeEventListener("click", this.handleOutsideClick, false);
        document.body.style.overflow = 'unset';
    }

    private handleKeyUp = (event: { keyCode: number; preventDefault: () => void; }): void => {
        if (event.keyCode === 27) {
            event.preventDefault();
            this.props.handleToggleDialog();
        }
    };

    private handleOutsideClick = (event: { target: any }): void => {
        if (event.target.classList.contains(`${style.dialog}`)) {
            this.props.handleToggleDialog();
        }
    }

    private handleContent = (count: number): void => {
        this.setState({
            content: count
        })
    }

    private renderContent = (): JSX.Element | null => {
        const { addDevice, handleToggleDialog, addSagaOven, addSagaRobot } = this.props;
        switch (this.state.content) {
            case 0:
                return <SelectDevice
                    handleToggleDialog={handleToggleDialog}
                    handleContent={this.handleContent} />;
            case 1:
                return <AddDeviceOven
                    alert = {this.props.alert}
                    handleToggleDialog={handleToggleDialog}
                    handleContent={this.handleContent}
                    addDevice={addDevice}
                    addSagaOven={addSagaOven}
                />;
            case 2:
                return <AddDeviceRobot
                    handleToggleDialog={handleToggleDialog}
                    handleContent={this.handleContent}
                    addDevice={addDevice}
                    addSagaRobot={addSagaRobot}
                />;
            default:
                return null;
        }
    }

    render() {

        console.log(this.props)
        return (
            <Fragment>
                        {
            this.props.isLoad ?
              <Loader /> : null
          }
                { this.props.alert.length === 0 ? null : 
                    <Snackbar open={true}>
                        <Alert text={this.props.alert} />
                    </Snackbar> 
                }
                
                <div className={style.dialog}>
                    {this.renderContent()}
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = (state: { alertReducer: AlertState, loaderReducer: LoaderState }): ConnectedProps => {
    return ({
      alert: state.alertReducer.alert,
      isLoad: state.loaderReducer.isLoad
    });
}

export default connect(mapStateToProps)(AddDeviceContainer);