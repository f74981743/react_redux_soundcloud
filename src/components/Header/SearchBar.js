import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class SearchBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isExpandedSearchBar: false
        };
    }

    focusSearchBar(event) {
        event.preventDefault();
        const { actions } = this.props;
    }

    blurSearchBar(event) {
        event.preventDefault();
        const { actions } = this.props;
    }

    keyUpSearchBar(event) {
        const { actions, currentTags } = this.props;
        const tracksBoard = document.querySelector('.tracks-board');
        if ((event.keyCode || event.which) === 13) { // if press enter
            actions.fetchAllTracks(currentTags, true, event.target.value);
            tracksBoard.scrollTop = 0;
        }
    }

    render() {
        const searchBarCls = classNames({
            'search': true,
            'open': this.state.isExpandedSearchBar
        });

        return (
            <div className={searchBarCls}>
                <input type="search" className="search-box" onFocus={this.focusSearchBar.bind(this)} onBlur={this.blurSearchBar.bind(this)} onKeyUp={this.keyUpSearchBar.bind(this)} />
                <span className="search-button">
                    <span className="search-icon" onClick={() => {
                        this.setState({isExpandedSearchBar: !this.state.isExpandedSearchBar});
                    }}></span>
                </span>
            </div>
        )
    }
}