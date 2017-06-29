import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import classNames from 'classnames';

class PlayList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { hide, songs } = this.props;

        const playListCls = classNames({
            'playlist': true,
            'hide': (hide) ? true : false
        });

        return (
            <div className={playListCls}>
                {
                    songs.map((song) => {
                        return (
                            <div className="song-info-playlist">
                                <img src={song.artwork_url} />
                                <div className="song-title">{song.title}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { songs } = state.playlist;
    return {
        songs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
