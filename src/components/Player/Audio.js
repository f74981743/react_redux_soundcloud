import React, { Component, PropTypes } from 'react';

export default class Audio extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleProgressPercent(currentTime, duration) {
        return `${(currentTime / duration) * 100}%`
    }

    handleTimeUpdate() {
        const {actions, player} = this.props;
        var currentTime = this.audio.currentTime;
        var duration = this.audio.duration;
        
        if (!player.isDragging) {
            actions.setCurrentTime(currentTime);
            actions.setDuration(duration);
            actions.setProgressPercent(this.handleProgressPercent(currentTime, duration));
        }
    }

    componentDidMount() {
        this.audio.addEventListener('timeupdate', e => (this.handleTimeUpdate && this.handleTimeUpdate()))
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) {
        const {player, playlist} = props;
        if (playlist[0].src != this.audio.src) this.audio.src = playlist[0].src;
        if (player.isPaused !== this.audio.paused) player.isPaused ? this.audio.pause() : this.audio.play();
        if (player.volume != this.audio.volume) this.audio.volume = player.volume;
        if (player.isMuted != this.audio.muted) this.audio.muted = player.isMuted;
    }

    render() {
        const {playlist} = this.props;
        return (
            <audio ref={(c) => this.audio = c} id='audio' src={playlist[0].src}></audio>
        )
    }
}