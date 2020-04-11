import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import style from './Search.module.scss';
import { Dispatch } from '../../redux/store';
import { RobotHoover, Oven } from '../../redux/reducers/deviceReducer';
import { setDevices } from '../../redux/actions/deviceActions/deviceActions';
import { connect } from 'react-redux';
import { devicesAPI } from '../../api/api';

type Props = ReturnType<typeof mapDispatchToProps>;

class Search extends Component<Props> {

    public state = {
        term: ''
    }

    private onSearchChange = (event: { currentTarget: { value: any; }; }): void => {
        this.setState({
            term: event.currentTarget.value
        })
    }

    private onSearchClick = async (): Promise<void> => {
        const search: any = await devicesAPI.search(this.state.term);
        this.props.loadDevices(search.data);
    }

    render() {
        return (
            <div className={style.search}>
                <input type='text' className={style.search__input} placeholder='Search' onChange={this.onSearchChange}></input>
                <button className={style.search__btn} onClick={this.onSearchClick} >
                    <SearchIcon />
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadDevices: (p: Array<Oven | RobotHoover>) => {
        return dispatch(setDevices(p));
    }
})

export default connect(null, mapDispatchToProps)(Search);