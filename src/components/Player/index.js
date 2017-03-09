import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import ProgressBar from './ProgressBar';
import ControlPanel from './ControlPanel';
import Audio from './Audio';

class Player extends Component {
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
        const {playlist, player, actions} = this.props;
        return (
            <div>
                <Audio
                    player={player}
                    playlist={playlist}
                    actions={actions}
                    muted={player.isMuted}
                />
                <ProgressBar {...this.props}
                    handleSlideProgress = {this.handleSlideProgress.bind(this)}
                 />
                <ControlPanel {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        player: state.player,
        playlist: state.playlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);