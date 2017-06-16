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
    }

    handleSlideProgress(percent) {

        const {player} = this.props;
        var setTime = (percent / 100) * player.duration;
		//this.setState({setTime, setTimeSign: Date.now()})
		//rerender is slow..
		document.querySelector('#audio').currentTime = setTime;
    }

    render() {
        const { src, player, playlist, actions, activeTrack } = this.props;
        return (
            <div className="player">
                <Audio
                    {...this.props}
                />
                <div className="track-info">
                    <img src={activeTrack.artwork_url} />
                    <div className="track-text">
                        <div className="title">{activeTrack.title}</div>
                        <div className="author">{activeTrack.user.username}</div>
                    </div>
                </div>
                <ProgressBar
                    {...this.props}
                    handleSlideProgress = {this.handleSlideProgress.bind(this)}
                />
                <ControlPanel
                    {...this.props}
                />
            </div>
        )
    }
}