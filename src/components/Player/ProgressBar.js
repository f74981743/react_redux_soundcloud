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
    }

    formatTime(time) {
		var min = Math.floor(time / 60).toString()
		var sec = Math.floor(time % 60).toString()
		if(sec.length == 1) sec = '0' + sec
		return `${min}:${sec}`
	}

    mouseDown(e) {
        e.preventDefault();
        const {actions} = this.props;
        actions.setDragging(true);
        this.setState({dragging: true});
        document.addEventListener('mousemove', this.mouseMove.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    mouseUp(e) {
        e.preventDefault();
        const progressBody = ReactDOM.findDOMNode(this.refs.progressBody);
        const progressDragger = ReactDOM.findDOMNode(this.refs.progressDragger);
        const {actions, dragging, handleSlideProgress} = this.props;
        document.removeEventListener('mousemove', this.mouseMove.bind(this));
        
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
            handleSlideProgress(width * 100);
            actions.setDragging(false);
            this.setState({dragging: false});
		}

        document.removeEventListener('mouseup', this.mouseUp.bind(this));
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

    componentWillReceiveProps(props){
        const progressBody = ReactDOM.findDOMNode(this.refs.progressBody);
        const progressDragger = ReactDOM.findDOMNode(this.refs.progressDragger);

        if(!this.state.dragging && !props.player.isPaused){
            progressBody.style.width = props.player.progressPercent;
            progressDragger.style.left = props.player.progressPercent;
        }
        
	}

    render() {
        const {player} = this.props;
        return (
            <div className='progress'>
                <span className='current-time'>{this.formatTime(player.currentTime)}</span>
                <div className='pgbar-outer'>
                    <div className='pg-bar'
                        ref={(c) => this.pgBar = c}
                        onClick={this.mouseClick.bind(this)}
                        onMouseDown={this.mouseDown.bind(this)}
                    >
                        <div className='played'
                            ref="progressBody"
                        ></div>
                        <div className='circle'
                            ref="progressDragger"
                        >
                        </div>
                    </div>
                </div>
                <div className='duration-time'>{this.formatTime(player.duration)}</div>
            </div>
        )
    }
}