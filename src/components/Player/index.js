import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import ProgressBar from './ProgressBar';
import ControlPanel from './ControlPanel';
import Audio from './Audio';

export default class Player extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSlideProgress = this.handleSlideProgress.bind(this);
    }

    render() {
        const { activeTrack } = this.props;
        const artworkUrl = (activeTrack.artwork_url) ? activeTrack.artwork_url : 'src/images/post_album.png';
        return (
            <div className="player">
                <Audio
                    {...this.props}
                />
                <div className="track-info">
                    <img src={artworkUrl} />
                    <div className="track-text">
                        <div className="title">{activeTrack.title}</div>
                        <div className="author">{activeTrack.user.username}</div>
                    </div>
                </div>
                <ProgressBar
                    {...this.props}
                    handleSlideProgress = {this.handleSlideProgress}
                />
                <ControlPanel
                    {...this.props}
                />
            </div>
        )
    }

    handleSlideProgress(percent) {
        const {player} = this.props;
        var setTime = (percent / 100) * player.duration;
		document.querySelector('#audio').currentTime = setTime;
    }
}