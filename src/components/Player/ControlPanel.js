import React, { Component, PropTypes } from 'react';
import VolumeBar from './VolumeBar';
import className from 'classname';

export default class ControlPanel extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handlePlay() {
        const {actions} = this.props;
        actions.handlePlay();
    }

    handlePause() {
        const {actions} = this.props;
        actions.handlePause();
    }

    handleSlideVolume(volume) {
        const {actions} = this.props;
		actions.setVolume(volume);
    }

    handleMute() {
        const {actions} = this.props;
        actions.setMuted(true);
    }

    handleResumeVol() {
        const {actions} = this.props;
        actions.setMuted(false);
    }

    render() {
        const {player} = this.props;

        var playBtnCls = className({
            'play-btn': true,
            'btn': true,
            'hide': (player.isPaused === true) ? false : true
        });
        var pauseBtnCls = className({
            'pause-btn': true,
            'btn': true,
            'hide': (player.isPaused === true) ? true : false
        });
        var volBtnCls = className({
            'vol-btn': true,
            'btn': true,
            'hide': (player.isMuted === true) ? true : false 
        });
        var mutedBtnCls = className({
            'muted-btn': true,
            'btn': true,
            'hide': (player.isMuted === true) ? false : true
        });

        return (
            <div className='control-panel'>
                {/*<div className='song-info'>
                    <div className='cover-image'>
                    </div>
                    <div className='song-detail'>
                    </div>
                    <p className='song'></p>
                    <p className='artist'></p>
                </div>*/}
                <div className='controller'>
                    <div className={playBtnCls} onClick={this.handlePlay.bind(this)}></div>
                    <div className={pauseBtnCls} onClick={this.handlePause.bind(this)}></div>
                    <div className={volBtnCls} onClick={this.handleMute.bind(this)}></div>
                    <div className={mutedBtnCls} onClick={this.handleResumeVol.bind(this)}></div>
                    <VolumeBar 
                        handleSlideVolume={this.handleSlideVolume.bind(this)}
                        {...this.props}
                    />
                </div>
            </div>
        )
    }
}