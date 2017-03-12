import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import './App.css';

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
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <div>{this.props.children}</div>
            </div>
        );
    }
}

export default App;
