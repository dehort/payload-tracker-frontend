import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import MultiSelectDropdown from './MultiSelectDropdown';
import FilterBubble from './FilterBubble';

const FilterBubbleContainer = props => {
  return(
    <div>
        {props.filters.map(([id, key, value]) =>
            <FilterBubble id={id} filter={key} value={value} closeBubble={props.closeBubble}/>
        )}
    </div>
  )
}

class SearchBar extends Component {

  state = {
    filterCount: 0,
    filters: [],
    filterInputOpen: false,
    newValue: '',
    payload_id: '',
  }

  setSelected = (filterType, filterValue) => {
    if(filterType == 'Sort Direction'){
      this.setState({
        sort_dir: filterValue
      })
    } if (filterType == 'Sort By') {
      this.setState({
        sort_by: filterValue
      })
    }
  }

  openFilterInput = (item) => {
    this.setState({
      filterInputOpen: true,
      newFilter: item,
    })
  }

  createBubble = () => {
    var {filterCount, newFilter, newValue} = this.state
    if (newValue !== '' && newFilter !== ''){
      this.state.filters.push([filterCount, newFilter, newValue])
      this.setState({
        filterCount: this.state.filterCount + 1,
        filterInputOpen: false,
        newFilter: '',
        newValue: '',
      })
      this.forceUpdate()
    }
  }

  closeBubble = (id) => {
    for(var i = 0; i < this.state.filters.length; i++) {
        if(this.state.filters[i][0] == id){
            this.state.filters.splice(i,1)
        }
    }
    this.forceUpdate();
}

  onChange = (e) => {
      this.setState({
          [ e.target.name ] : [ e.target.value ]
      })
  }

  submitQuery = (query = 'http://localhost:8080/v1/payloads') => {
    if (this.state.payload_id !== '') {
      query += `/${this.state.payload_id}`;
      this.setState({
        payload_id: ''
      })
    } else {
      query += '?';
      if ('sort_by' in this.state){
        console.log(this.state.sort_by)
        query += `sort_by=${this.state.sort_by}&`;
      }
      if ('sort_dir' in this.state) {
        query += `sort_dir=${this.state.sort_dir}&`;
      }
      if ('filters' in this.state) {
        for(var i = 0; i < this.state.filters.length; i++) {
          query += `${this.state.filters[i][1]}=${this.state.filters[i][2]}&`;
        }
      }
    }
    this.props.search(
      query
    );
  }

  render() {
  return (
    <div>
      <input 
            type='text'
            name='payload_id'
            onChange={this.onChange}
            style={inputStyle}
            placeholder='Enter Payload ID...'
            value={this.state.payload_id}
      />
      <button type="button" onClick={(e) => {this.submitQuery()}} style={buttonStyle}> 
            Submit
      </button>
      <Dropdown header={"Sort By"} items={[
        'service', 'source', 'account', 'payload_id',
        'inventory_id', 'system_id', 'status',
        'status_msg', 'date', 'created_at'
        ]} setSelected={this.setSelected}/>

      <Dropdown header={"Sort Direction"} items={[
        'asc', 'desc'
        ]} setSelected={this.setSelected}/>

      <MultiSelectDropdown header={"Filter By"} items={[
        'service', 'source', 'account', 'inventory_id', 
        'system_id', 'status', 'status_msg', 'date_lt', 
        'date_gt', 'date_lte', 'date_gte', 'created_at_lt',
        'created_at_gt', 'created_at_lte', 'created_at_gte'
      ]} createBubble={this.openFilterInput}/>

      <input
        type='text'
        name='newValue'
        onChange={this.onChange}
        style={this.state.filterInputOpen ? {} : { display: 'none' }}
        placeholder='Enter...'
        value={this.state.newValue}
      />
      <button 
        type="button" 
        style={this.state.filterInputOpen ? {} : { display: 'none' }} 
        onClick={(e) => {this.createBubble()}}>
        Enter
      </button>

      <FilterBubbleContainer 
        filters={this.state.filters}
        closeBubble={this.closeBubble}
      />

    </div>
  );
  }

}

const buttonStyle = {
  width: '10%',
  padding: '12px 20px',
  height: '38px',
  background: '#008000',
  boxSizing: 'border-box',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#fff',
}

const inputStyle = {
  width: '90%',
  padding: '12px 20px',
  margin: '8px 0',
  boxSizing: 'border-box',
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
}

export default SearchBar;
