import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import CourseDetail from './components/CourseDetail/CourseDetail';
import CourseList from './components/CourseList/CourseList';
import Login from './components/Login/Login';


const Root = () => (
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path={'/'} component={App}>
                <IndexRedirect to={'courses'} />
                <Route path={'courses'} component={CourseList}/>
                <Route path={'courses/:id'} component={CourseDetail}/>
                <Route path={'login'} component={Login} />
            </Route>
        </Router>
    </MuiThemeProvider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
