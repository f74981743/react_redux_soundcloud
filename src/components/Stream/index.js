import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import Player from '../Player';
import { CLIENT_ID } from '../../constants/authConstant';

class Stream extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidUpdate() {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);

        if (!audioElement) { return; }

        const { activeTrack } = this.props;
        if (activeTrack) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }

    render() {
        const { actions, user, tracks, activeTrack } = this.props;
        return (
            <div>
                <div>
                    {
                        user ?
                            <div>{user.username}</div> :
                            <button onClick={actions.auth} type="button">Login</button>
                    }
                </div>
                <br/>
                <div>
                    {
                    tracks.map((track, key) => {console.log(track);
                        return (
                            <div className="track" key={key}>
                                {track.title}
                                <button type="button" onClick={()=> actions.playTrack(track)}>Play</button>
                            </div>
                        );
                    })
                    }
                </div>
                {
                    activeTrack ?
                        <audio id="audio" ref="audio" src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}></audio> :
                        null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { tracks, activeTrack } = state.track;
    return {
        player: state.player,
        playlist: state.playlist,
        user,
        tracks,
        activeTrack
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);