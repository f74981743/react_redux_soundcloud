import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class SearchBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isExpandedSearchBar: false
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    render() {
        const searchBarCls = classNames({
            'search': true,
            'open': this.state.isExpandedSearchBar
        });

        return (
            <div className={searchBarCls}>
                <input type="search" 
                    className="search-box" 
                    onFocus={this.handleFocus} 
                    onBlur={this.handleBlur} 
                    onKeyUp={this.handleKeyUp} />
                <span className="search-button">
                    <span className="search-icon" onClick={() => {
                        this.setState({isExpandedSearchBar: !this.state.isExpandedSearchBar});
                    }}></span>
                </span>
            </div>
        )
    }

    handleFocus(event) {
        event.preventDefault();
    }

    handleBlur(event) {
        event.preventDefault();
    }

    handleKeyUp(event) {
        const { actions, currentTags } = this.props;
        if ((event.keyCode || event.which) === 13) { // if press enter
            console.log('press enter');
            console.log(event.target.value);
            actions.fetchAllTracks(currentTags, true, event.target.value);
        }
    }
}