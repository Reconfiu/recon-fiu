import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import {Router, Route, browserHistory, Redirect} from 'react-router';
import CourseDetail from './components/CourseDetail/CourseDetail';
import CourseList from './components/CourseList/CourseList';
import Login from './components/Login/Login';

const Root = () => (
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path={'/login'} component={Login}/>
            <Redirect from="/" to="/login" />
            <Route path={'/'} component={App}>
                <Route path={'courses'} component={CourseList}/>
                <Route path={'courses/:id'} component={CourseDetail}/>
            </Route>
        </Router>
    </MuiThemeProvider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
