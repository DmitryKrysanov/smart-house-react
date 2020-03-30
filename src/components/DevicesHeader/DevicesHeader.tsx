import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import './DevicesHeader.scss';
import { Dispatch } from '../../redux/store';
import { RemoveAllDevices } from '../../redux/actions/deviceActions/deviceActions';
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
    // this.setState({
    //   term: event.currentTarget.value
    // })
    // console.log(this.state.term)
    //this.props.onSearchState(this.state.term);  //first symbol is empty
    this.props.onSearchState(event.currentTarget.value);
  }

  public onRemoveAllDevices = () => {
  this.props.removeAllDevices()
}

render() {
  return (
    <header className='header'>
      <div className='wrapper'>
          <h2>Home</h2>
          <input type='text' className='search' placeholder='Search' onChange={this.onSearchChange}></input>
          <button className='more_btn' onClick={this.onRemoveAllDevices} ><DeleteIcon /></button>
      </div>
    </header>
  );
}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeAllDevices: () => {
      return dispatch(RemoveAllDevices());
  }
})

export default connect(() => ({}), mapDispatchToProps)(DevicesHeader);
