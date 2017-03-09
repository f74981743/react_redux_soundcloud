import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Stream from './components/Stream/';
import Callback from './components/Callback';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Stream} />
        <Route path="/" component={Stream} />
        <Route path="callback"  component={Callback} />
    </Route>
);