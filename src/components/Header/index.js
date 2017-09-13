import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import classNames from 'classnames';
import SearchBar from './SearchBar';


export default class Header extends Component {
    constructor(props, context) {
        super(props, context);
    }

    changeTags(tags) {
        const { actions } = this.props;
        actions.setNextHref(null);
        actions.fetchAllTracks(tags, true);
    }

    render() {
        const { hide, songs, actions } = this.props;

        const headerCls = classNames({
            'header': true
        });

        return (
            <div className={headerCls}>
                <div className="container">
                    <a href="#" onClick={() => {
                        this.changeTags('chill');
                    }}>CHILL</a>
                    <a href="#" onClick={() => {
                        this.changeTags('deep');
                    }}>DEEP</a>
                    <a href="#" onClick={() => {
                        this.changeTags('dubstep');
                    }}>DUBSTEP</a>
                    <a href="#" onClick={() => {
                        this.changeTags('house');
                    }}>HOUSE</a>
                    <a href="#" onClick={() => {
                        this.changeTags('progressive');
                    }}>PROGRESSIVE</a>
                    <a href="#" onClick={() => {
                        this.changeTags('tech');
                    }}>TECH</a>
                    <a href="#" onClick={() => {
                        this.changeTags('chill');
                    }}>TROPICAL</a>
                    <SearchBar actions={actions} />
                </div>
            </div>
        )
    }
}
