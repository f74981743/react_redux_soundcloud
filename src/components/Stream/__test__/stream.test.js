import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedStream, { Stream } from '../index';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Component: Stream', () => {
    var wrapper;
    /*it('should render tracks', () => {
        const tree = toJson(shallow(<Stream tracks={[]} />));
        expect(tree).toMatchSnapshot();
    });*/
    beforeEach(() => {
        wrapper = shallow(<Stream tracks={[]} />);
    });

    it ('render the Stream component', () => {
        expect(wrapper.length).toEqual(1)
    });
});

describe('render: ConnectedStream', () => {
    const initialState = {
        player: {
            duration: 1,
            currentTime: 0,
            progressPercent: '0%',
            bufferedPercent: '0%',
            isMuted: false,
            isPaused: true,
            volume: 0.5,
            loopMode: 'none',
            isDragging: false
        },
        playlist: {
            songs: []
        },
        user: {},
        tracks: [],
        isFetching: false,
        activeTrack: null
    };
    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it ('render the connectedStream', () => {
        container = mount(
            <Provider store={store}>
                <ConnectedStream />
            </Provider>
        )
        expect(container.length).toEqual(1);
    });

    it('check props match with initialState', () => {
        expect(container.prop('user').toEqual(initialState.user));
    });
});