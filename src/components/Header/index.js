import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import classNames from 'classnames';
import SearchBar from './SearchBar';


export default class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentGenre: 'chill',
            isGenrePanelHide: true
        };
    }

    changeTags(tags) {
        const { actions } = this.props;
        const tracksBoard = document.querySelector('.tracks-board');
        tracksBoard.scrollTop = 0;
        actions.setNextHref(null);
        actions.fetchAllTracks(tags, true);
        this.setState({
            currentGenre: tags,
            isGenrePanelHide: true
        })
    }

    render() {
        const { actions, currentTags } = this.props;

        const headerCls = classNames({
            'header': true
        });

        const genrePanelCls = classNames({
            'genre-panel': true,
            'hide': this.state.isGenrePanelHide
        });
        
        return (
            <div className={headerCls}>
                <div className="container">
                    <div className="current-genre" onClick={() => {
                         this.setState({
                             isGenrePanelHide: !this.state.isGenrePanelHide
                         })
                    }}>{this.state.currentGenre}</div>
                    <div className={genrePanelCls}>
                        <a href="#" onClick={() => {
                            this.changeTags('chill');
                        }} className={(this.state.currentGenre === 'chill') ? 'current' : ''}>CHILL</a>
                        <a href="#" onClick={() => {
                            this.changeTags('deep');
                        }} className={(this.state.currentGenre === 'deep') ? 'current' : ''}>DEEP</a>
                        <a href="#" onClick={() => {
                            this.changeTags('dubstep');
                        }} className={(this.state.currentGenre === 'dubstep') ? 'current' : ''}>DUBSTEP</a>
                        <a href="#" onClick={() => {
                            this.changeTags('house');
                        }} className={(this.state.currentGenre === 'house') ? 'current' : ''}>HOUSE</a>
                        <a href="#" onClick={() => {
                            this.changeTags('progressive');
                        }} className={(this.state.currentGenre === 'progressive') ? 'current' : ''}>PROGRESSIVE</a>
                        <a href="#" onClick={() => {
                            this.changeTags('tech');
                        }} className={(this.state.currentGenre === 'tech') ? 'current' : ''}>TECH</a>
                        <a href="#" onClick={() => {
                            this.changeTags('tropical');
                        }} className={(this.state.currentGenre === 'tropical') ? 'current' : ''}>TROPICAL</a>
                    </div>
                    <SearchBar actions={actions} currentTags={currentTags} />
                </div>
            </div>
        )
    }
}
