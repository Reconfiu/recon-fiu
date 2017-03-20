import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import {Link} from "react-router";

class App extends Component {
    constructor(props) {
        super(props);

        // Needed for onTouchTap
        injectTapEventPlugin();
    }

    render() {
        return (
            <div className="App">
                <AppBar
                    title="Recon"
                    iconElementRight={<Link to="login"><FlatButton label="Login" /></Link>}
                />
                <div>{this.props.children}</div>
            </div>
        );
    }
}

export default App;
