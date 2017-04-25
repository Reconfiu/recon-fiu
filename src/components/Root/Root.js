/**
 * Created by jackbauer on 4/20/2017.
 */
import React from 'react';
import {Router, Route, browserHistory, Redirect} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CourseDetail from '../CourseDetail/CourseDetail';
import CourseList from '../CourseList/CourseList';
import Login from '../Login/Login';
import App from '../App/App';


export default class Root extends React.Component {
    constructor(props) {
        super(props);

        // Needed for onTouchTap
        injectTapEventPlugin();
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router history={browserHistory}>
                    <Route path={'/login'} component={Login}/>
                    <Redirect from="/" to="/login" />
                    <Route path={'/'} component={App}>
                        <Route path={'courses'} component={CourseList}/>
                        <Route path={'courses/:id'} component={CourseDetail}/>
                    </Route>
                    <Route path={'*'} component={Login}/>
                    <Redirect from="*" to="/login" />
                </Router>
            </MuiThemeProvider>
        );
    }
}