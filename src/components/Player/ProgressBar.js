import React, { Component, PropTypes } from 'react';

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

    mouseDown() {
        const {actions} = this.props;
        actions.setDragging(true);
        this.setState({dragging: true})
        this.pgBar.addEventListener('mousemove', this.mouseMove.bind(this))
    }

    mouseUp() {
        const {actions} = this.props;
        actions.setDragging(false);
        this.setState({dragging: false})
        this.pgBar.removeEventListener('mousemove', this.mouseMove.bind(this))
    }

    mouseMove(e) {
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
            //actions.setProgressPercent(`${width * 100}%`);
            this.setState({width: `${width * 100}%`})
            handleSlideProgress(width * 100);
		}
		e.preventDefault()
    }

    mouseClick(e) {
        const {actions, handleSlideProgress} = this.props;
        var barRect = this.pgBar.getClientRects()[0];
        var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
        if (width > 1) {
            width = 1;
        }
        if (width < 0) {
            width = 0;
        }
        //actions.setProgressPercent(`${width * 100}%`);
        this.setState({width: `${width * 100}%`})
        handleSlideProgress(width * 100);
    }

    componentWillReceiveProps(props){
		this.setState({width: props.player.progressPercent})
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
                        onMouseUp={this.mouseUp.bind(this)}
                    >
                        <div className='played'
                            style={{
                                //width: player.progressPercent
                                width: this.state.width
                            }}
                        ></div>
                        <div className='circle'
                            style={{
                                //left: player.progressPercent
                                left: this.state.width
                            }}
                        >
                        </div>
                    </div>
                </div>
                <div className='duration-time'>{this.formatTime(player.duration)}</div>
            </div>
        )
    }
}