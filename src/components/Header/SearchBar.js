import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class SearchBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isHidePlayList: true
        };
    }

    focusSearchBar(event) {
        event.preventDefault();
        const { actions } = this.props;
        console.log('focus');
    }

    blurSearchBar(event) {
        event.preventDefault();
        const { actions } = this.props;

        console.log('blur');
    }

    keyUpSearchBar(event) {
        const { actions, currentTags } = this.props;
        if ((event.keyCode || event.which) === 13) { // if press enter
            console.log('press enter');
            console.log(event.target.value);
            actions.fetchAllTracks(currentTags, true, event.target.value);
        }
    }

    render() {
        return (
            <div className="search">
                <input type="search" className="search-box" onFocus={this.focusSearchBar.bind(this)} onBlur={this.blurSearchBar.bind(this)} onKeyUp={this.keyUpSearchBar.bind(this)} />
                <span className="search-button">
                    <span className="search-icon"></span>
                </span>
            </div>
        )
    }
}