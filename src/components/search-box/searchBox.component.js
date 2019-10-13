import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DELAY = 600;

/**
 * Name: SearchBox
 * Description: Search box is responsible to handle input changes
 */
class SearchBox extends Component {

    state = {
        searchQuery: ""
    }

    timer;

    componentWillUnmmount() {
        clearTimeout(this.timer);
    }

    /**
     * Handle on enter press
     */
    handleSubmit = (e) => {
        e.preventDefault();
        clearTimeout(this.timer);
        this.notifyOnQueryChange();
    }

    /**
     * handle on input change
     */
    handleOnChange = (e) => {
        clearTimeout(this.timer);
        this.setState({
            searchQuery: e.target.value
        }, () => this.timer = setTimeout(this.notifyOnQueryChange, DELAY))
    }

    /**
     * Notify props
     */
    notifyOnQueryChange = () => {
        this.props.onQueryChange(this.state.searchQuery);
    }

    /**
     * Main render function
     */
    render() {
        const { searchQuery } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>

                <input
                    className="md-input search-box"
                    autoComplete="off"
                    placeholder="MMSI: ex. 239410300"
                    onChange={this.handleOnChange}
                    type="text"
                    id="searchQuery"
                    value={searchQuery} />
            </form>
        )
    }
}

SearchBox.propTypes = {
    onQueryChange: PropTypes.func.isRequired
}

export default SearchBox;