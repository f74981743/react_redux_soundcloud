import React, { Component, PropTypes } from 'react';
import VolumeBar from './VolumeBar';
import classNames from 'classnames';
import PlayList from '../PlayList';

export default class ControlPanel extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isHidePlayList: true
        };

        this.showPlaylistPanel = this.showPlaylistPanel.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleMute = this.handleMute.bind(this);
        this.handleResumeVol = this.handleResumeVol.bind(this);
    }

    render() {
        const {player} = this.props;

        const playlistBtnCls = classNames({
            'playlist-btn': true,
            'btn': true
        });

        const playBtnCls = classNames({
            'play-btn': true,
            'btn': true,
            'hide': (player.isPaused === true) ? false : true
        });
        const pauseBtnCls = classNames({
            'pause-btn': true,
            'btn': true,
            'hide': (player.isPaused === true) ? true : false
        });
        const volBtnCls = classNames({
            'vol-btn': true,
            'btn': true,
            'hide': (player.isMuted === true) ? true : false 
        });
        const mutedBtnCls = classNames({
            'muted-btn': true,
            'btn': true,
            'hide': (player.isMuted === true) ? false : true
        });

        return (
            <div className='control-panel'>
                <div className='controller'>
                    <PlayList hide={this.state.isHidePlayList} />
                    <div className={playlistBtnCls} onClick={this.showPlaylistPanel}></div>
                    <div className={playBtnCls} onClick={this.handlePlay}></div>
                    <div className={pauseBtnCls} onClick={this.handlePause}></div>
                    <div className={volBtnCls} onClick={this.handleMute}></div>
                    <div className={mutedBtnCls} onClick={this.handleResumeVol}></div>
                    <VolumeBar 
                        handleSlideVolume={this.handleSlideVolume.bind(this)}
                        {...this.props}
                    />
                </div>
            </div>
        )
    }

    handlePlay() {
        const { actions } = this.props;
        actions.handlePlay();
    }

    handlePause() {
        const { actions } = this.props;
        actions.handlePause();
    }

    handleSlideVolume(volume) {
        const { actions } = this.props;
		actions.setVolume(volume);
    }

    handleMute() {
        const { actions } = this.props;
        actions.setMuted(true);
    }

    handleResumeVol() {
        const {actions} = this.props;
        actions.setMuted(false);
    }

    showPlaylistPanel() {
        const { actions } = this.props;
        const self = this;
        if (self.state.isHidePlayList) {
            self.setState({
                isHidePlayList: false
            });
            document.body.addEventListener('click', function() {
                self.setState({
                    isHidePlayList: true
                });
                document.body.removeEventListener('click', function() {});
            });
        } else {
            self.setState({
                isHidePlayList: true
            });
        }
    }
}