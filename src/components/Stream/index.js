import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import Player from '../Player';
import { CLIENT_ID } from '../../constants/authConstant';
import { getImageUrl } from '../../utils/utils';
import { IMAGE_SIZES } from '../../constants/songConstant';
import classNames from 'classnames';

class Stream extends Component {

    constructor(props, context) {
        super(props, context);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        const { actions } = this.props;
        const tracksBoard = ReactDOM.findDOMNode(this.refs.tracksBoard);
        tracksBoard.addEventListener('scroll', this.onScroll, false);
        actions.fetchAllTracks();
    }

    componentWillUnmount() {
        const tracksBoard = ReactDOM.findDOMNode(this.refs.tracksBoard);
        tracksBoard.removeEventListener('scroll', this.onScroll, false);
    }

    handlePlay() {
        
    }

    handlePause() {

    }

    onScroll() {
        const { actions } = this.props;
        const tracksBoard = ReactDOM.findDOMNode(this.refs.tracksBoard);
        if (tracksBoard.scrollTop >= (tracksBoard.scrollHeight - tracksBoard.offsetHeight - 200)) {
            actions.fetchAllTracks();
        }
    }

    render() {
        const { actions, player, user, tracks, activeTrack, isFetching } = this.props;
        const loadingCls = classNames({
           'loading': true,
           hide: isFetching === false
        });

        

        return (
            <div ref="tracksBoard" className="tracks-board">
                <div>
                    {
                    tracks.map((track, key) => {
                        const playBtnCls = classNames({
                            'play-btn': true,
                            'btn': true,
                            'hide': (player.isPaused === true || track !== activeTrack) ? false : true
                        });

                        const pauseBtnCls = classNames({
                            'pause-btn': true,
                            'btn': true,
                            'hide': (player.isPaused !== true && track === activeTrack) ? false : true
                        });
                        const image = getImageUrl(track.artwork_url, IMAGE_SIZES.LARGE);
                        return (
                            <div className="track" onDoubleClick={() => {
                                actions.playTrack(track);
                                actions.handlePlay();
                            }} key={key}>
                                <div className="track-img" style={{backgroundImage: `url(${image})`}}>
                                </div>
                                <div className={playBtnCls} onClick={this.handlePlay.bind(this)}></div>
                                <div className={pauseBtnCls} onClick={this.handlePause.bind(this)}></div>
                                <div className="track-name">
                                    <img src={track.user.avatar_url} />
                                    <div className="track-detail">
                                        <div className="title">{track.title}</div>
                                        <div className="author">{track.user.username}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    }
                    <div className={loadingCls}></div>
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
    const { tracks, activeTrack, isFetching } = state.track;
    return {
        player: state.player,
        playlist: state.playlist,
        user,
        tracks,
        activeTrack,
        isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);