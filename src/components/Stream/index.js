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

    render() {
        const { actions, player, user, tracks, activeTrack } = this.props;
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
                    tracks.map((track, key) => {
                        return (
                            <div className="track" key={key}>
                                {track.title}
                                <button type="button" onClick={()=> {
                                    actions.playTrack(track);
                                    actions.handlePlay();
                                }}>Play</button>
                            </div>
                        );
                    })
                    }
                </div>
                {
                    activeTrack ?
                        <Player src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`} player={player} actions={actions} /> :
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