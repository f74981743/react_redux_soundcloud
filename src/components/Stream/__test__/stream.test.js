import React from 'react';
import ReactDOM from 'react-dom';
import { Stream } from '../index';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('Component: Stream', () => {
    it('should render tracks', () => {
        const tree = toJson(shallow(<Stream tracks={[]} />));
        expect(tree).toMatchSnapshot();
    });
});