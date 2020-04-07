import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './DevicesHeader.scss';
import { Dispatch } from '../../redux/store';
import { connect } from 'react-redux';

interface Props {
  onSearchState: (term: string) => void
}

type ComponentProps = ReturnType<typeof mapDispatchToProps> & Props;

class DevicesHeader extends React.Component<ComponentProps> {

  state = {
    term: ''
  }

  public onSearchChange = (event: { currentTarget: { value: any; }; }) => {
    this.setState({
      term: event.currentTarget.value
    })
  }

  public onSearchClick = () => {
    this.props.onSearchState(this.state.term);
  }

render() {
  return (
    <header className='header'>
      <div className='wrapper'>
          <h6>Home</h6>
          <div className="search">
            <input type='text' className='search__input' placeholder='Search' onChange={this.onSearchChange}></input>
            <button className='search__btn' onClick={this.onSearchClick} ><SearchIcon /></button>
          </div>
      </div>
    </header>
  );
}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeAllDevices: () => {
      
  }
})

export default connect(() => ({}), mapDispatchToProps)(DevicesHeader);
