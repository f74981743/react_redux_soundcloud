import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class VolumeBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dragging: false
        }
    }

    render() {
        const { player } = this.props;
        return (
            <div className='vol-bar'>
                <div className='vol-bar-inner'
                    ref={(c) => this.volBar = c}
                    onClick={this.mouseClick.bind(this)}
                    onMouseDown={this.mouseDown.bind(this)}
                >
                    <div className='vol-current'
                        ref="volumeBody"
                        style={{width: player.volume * 100 + '%'}}
                    >
                    </div>
                    <span className='circle'
                        ref="volumeDragger"
                        style={{left: player.volume * 100 + '%'}}
                    ></span>
                </div>
            </div>
        )
    }

    mouseDown(e) {
        e.preventDefault();
        const { actions } = this.props;
        actions.setDragging(true);
        this.setState({dragging: true});
        document.addEventListener('mousemove', this.mouseMove.bind(this))
        document.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    mouseUp(e) {
        e.preventDefault();
        const volumeBody = ReactDOM.findDOMNode(this.refs.volumeBody);
        const volumeDragger = ReactDOM.findDOMNode(this.refs.volumeDragger);
        const { actions, handleSlideVolume } = this.props;
        
        document.removeEventListener('mousemove', this.mouseMove.bind(this));

        if (this.state.dragging) {
            var barRect = this.volBar.getClientRects()[0];
            var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
            if (width > 1) {
                width = 1;
            }
            if (width < 0) {
                width = 0;
            }

            volumeBody.style.width = `${width * 100}%`;
            volumeDragger.style.left = `${width * 100}%`;
            handleSlideVolume(width);
            actions.setDragging(false);
            this.setState({dragging: false});
        }
        document.removeEventListener('mouseup', this.mouseUp.bind(this));
    }

    mouseMove(e) {
        e.preventDefault();
        const volumeBody = ReactDOM.findDOMNode(this.refs.volumeBody);
        const volumeDragger = ReactDOM.findDOMNode(this.refs.volumeDragger);
        if(this.state.dragging){
			var barRect = this.volBar.getClientRects()[0];
            var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
            if (width > 1) {
                width = 1;
            }
            if (width < 0) {
                width = 0;
            }

            volumeBody.style.width = `${width * 100}%`;
            volumeDragger.style.left = `${width * 100}%`;
		}
    }

    mouseClick(e) {
        const { handleSlideVolume } = this.props;
        const volumeBody = ReactDOM.findDOMNode(this.refs.volumeBody);
        const volumeDragger = ReactDOM.findDOMNode(this.refs.volumeDragger);
        var barRect = this.volBar.getClientRects()[0];
        var width = (e.clientX - barRect.left) / (barRect.right - barRect.left);
        if (width > 1) {
            width = 1;
        }
        if (width < 0) {
            width = 0;
        }

        volumeBody.style.width = `${width * 100}%`;
        volumeDragger.style.left = `${width * 100}%`;
        handleSlideVolume(width);
    }
}