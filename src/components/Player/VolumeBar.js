import React, { Component, PropTypes } from 'react';

export default class VolumeBar extends Component {
    constructor(props, context) {
        super(props, context);
    }

    mouseDown() {
        const {actions} = this.props;
        actions.setDragging(true);
        this.volBar.addEventListener('mousemove', this.mouseMove.bind(this))
    }

    mouseUp() {
        const {actions} = this.props;
        actions.setDragging(false);
        this.volBar.removeEventListener('mousemove', this.mouseMove.bind(this))
    }

    mouseMove(e) {
        const {actions, dragging, handleSlideVolume} = this.props;
        if(dragging){
			var barRect = this.volBar.getClientRects()[0];
            var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
            if (width > 1) {
                width = 1;
            }
            if (width < 0) {
                width = 0;
            }
            handleSlideVolume(width);
		}
		e.preventDefault()
    }

    mouseClick(e) {
        const {actions, handleSlideVolume} = this.props;
        var barRect = this.volBar.getClientRects()[0];
        var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
        if (width > 1) {
            width = 1;
        }
        if (width < 0) {
            width = 0;
        }
        handleSlideVolume(width);
    }

    render() {
        const {player} = this.props;
        return (
            <div className='vol-bar'>
                <div className='vol-bar-inner'
                    ref={(c) => this.volBar = c}
                    onClick={this.mouseClick.bind(this)}
                    onMouseDown={this.mouseDown.bind(this)}
                    onMouseUp={this.mouseUp.bind(this)}
                >
                    <div className='vol-current'
                        style = {{
                            width: `${player.volume * 100}%`
                        }}
                    >
                    </div>
                    <span className='circle'
                        style = {{
                            left: `${player.volume * 100}%`
                        }}
                    ></span>
                </div>
            </div>
        )
    }
}