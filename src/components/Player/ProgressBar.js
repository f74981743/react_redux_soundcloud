import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class ProgressBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hovering: false,
            dragging: false,
            width: props.player.progressPercent
        }

        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseClick = this.mouseClick.bind(this);
    }

    componentWillReceiveProps(props){
        const progressBody = ReactDOM.findDOMNode(this.refs.progressBody);
        const progressDragger = ReactDOM.findDOMNode(this.refs.progressDragger);
        const buffered = ReactDOM.findDOMNode(this.refs.buffered);

        if(!this.state.dragging && !props.player.isPaused){
            progressBody.style.width = props.player.progressPercent;
            progressDragger.style.left = props.player.progressPercent;
            buffered.style.width = props.player.bufferedPercent;
        }
        
	}

    render() {
        const { player } = this.props;
        return (
            <div className='progress'>
                <span className='current-time'>{this.formatTime(player.currentTime)}</span>
                <div className='pgbar-outer'>
                    <div className='pg-bar'
                        ref={(c) => this.pgBar = c}
                        onClick={this.mouseClick}
                        onMouseDown={this.mouseDown}
                    >
                        <div className='played'
                            ref="progressBody"
                        ></div>
                        <div className='circle'
                            ref="progressDragger"
                        >
                        </div>
                        <div className="buffered"
                            ref="buffered"
                        >
                        </div>
                    </div>
                </div>
                <div className='duration-time'>{this.formatTime(player.duration)}</div>
            </div>
        )
    }

    mouseDown(e) {
        e.preventDefault();
        const {actions} = this.props;
        actions.setDragging(true);
        this.setState({dragging: true});
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    mouseUp(e) {
        e.preventDefault();
        const progressBody = ReactDOM.findDOMNode(this.refs.progressBody);
        const progressDragger = ReactDOM.findDOMNode(this.refs.progressDragger);
        const {actions, dragging, handleSlideProgress} = this.props;
        document.removeEventListener('mousemove', this.mouseMove);
        
        if (this.state.dragging) {
			var barRect = this.pgBar.getClientRects()[0];
            var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
            if (width > 1) {
                width = 1;
            }
            if (width < 0) {
                width = 0;
            }

            progressBody.style.width = `${width * 100}%`;
            progressDragger.style.left = `${width * 100}%`;
            handleSlideProgress(width * 100);
            actions.setDragging(false);
            this.setState({dragging: false});
		}

        document.removeEventListener('mouseup', this.mouseUp);
    }

    mouseMove(e) {
        e.preventDefault();
        const progressBody = ReactDOM.findDOMNode(this.refs.progressBody);
        const progressDragger = ReactDOM.findDOMNode(this.refs.progressDragger);
        const {actions, dragging, handleSlideProgress} = this.props;
        if(this.state.dragging){
			var barRect = this.pgBar.getClientRects()[0];
            var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
            if (width > 1) {
                width = 1;
            }
            if (width < 0) {
                width = 0;
            }

            progressBody.style.width = `${width * 100}%`;
            progressDragger.style.left = `${width * 100}%`;
		}
    }

    mouseClick(e) {
        const progressBody = ReactDOM.findDOMNode(this.refs.progressBody);
        const progressDragger = ReactDOM.findDOMNode(this.refs.progressDragger);
        const {actions, handleSlideProgress} = this.props;

        var barRect = this.pgBar.getClientRects()[0];
        var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
        if (width > 1) {
            width = 1;
        }
        if (width < 0) {
            width = 0;
        }

        progressBody.style.width = `${width * 100}%`;
        progressDragger.style.left = `${width * 100}%`;
        handleSlideProgress(width * 100);
    }

    formatTime(time) {
		var min = Math.floor(time / 60).toString()
		var sec = Math.floor(time % 60).toString()
		if(sec.length == 1) sec = '0' + sec
		return `${min}:${sec}`
	}
}