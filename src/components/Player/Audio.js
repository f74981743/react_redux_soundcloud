import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Audio extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleProgressPercent(currentTime, duration) {
        return `${(currentTime / duration) * 100}%`
    }

    handleTimeUpdate() {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        const {actions, player} = this.props;
        var currentTime = audioElement.currentTime;
        var duration = audioElement.duration;
        if (!player.isDragging) {
            console.log(currentTime, duration);
            if (!isNaN(currentTime)) actions.setCurrentTime(currentTime);
            if (!isNaN(duration)) actions.setDuration(duration);
            if (!isNaN(currentTime) && !isNaN(duration)) actions.setProgressPercent(this.handleProgressPercent(currentTime, duration));
        }
    }

    componentDidMount() {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        audioElement.addEventListener('timeupdate', e => (this.handleTimeUpdate && this.handleTimeUpdate()))
        //audioElement.addEventListener('timeupdate', this.handleTimeUpdate);
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) {
        const {src, player} = props;
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        console.log(audioElement.paused, player.isPaused);
        if (src != audioElement.src) audioElement.src = src;
        if (player.isPaused !== audioElement.paused) {
            player.isPaused ? audioElement.pause() : audioElement.play();
        }
        if (player.volume != audioElement.volume) audioElement.volume = player.volume;
        if (player.isMuted != audioElement.muted) audioElement.muted = player.isMuted;
    }

    render() {
        const { src } = this.props;
        return (
            <audio ref='audio' id='audio' src={src}></audio>
        )
    }
}