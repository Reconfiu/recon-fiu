/*import React from 'react';
import App from '../App/App';
import './index.css';
import {Router, Route, browserHistory, Redirect} from 'react-router';
import CourseDetail from '../CourseList/CourseList';
import CourseList from '../CourseDetail/CourseDetail';
import Login from '../Login/Login';

export default class Root extends React.Component {
    constructor(props) {
        super(props);

        // Needed for onTouchTap
        injectTapEventPlugin();
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path={'/login'} component={Login}/>
                <Redirect from="/" to="/login"/>
                <Route path={'/'} component={App}>
                    <Route path={'courses'} component={CourseList}/>
                    <Route path={'courses/:id'} component={CourseDetail}/>
                </Route>
            </Router>

        );
    }
   getChildContext() {
        return {muiTheme: getMuiTheme(theme)};
    }
    static get childContextTypes() {
        return {muiTheme: React.PropTypes.object.isRequired};
    }
}*/
