import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import '../../App.css';
import {Link} from "react-router";
import Sidenav from '../Sidenav/Sidenav';
import {styles} from './styles';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true, docked: true};
        // Needed for onTouchTap
        injectTapEventPlugin();
    }

    render() {
        return (
            <div className="App">
                <AppBar
                    style={{position: 'fixed'}} title="Recon"
                    onLeftIconButtonTouchTap={this.toggle.bind(this)}
                    iconElementRight={<Link to="login"><FlatButton label="Login" /></Link>}
                />
                <Sidenav open={this.state.open} docked={this.state.docked} onToggle={this.toggle.bind(this)}/>
                <div style={this.state.style}>{this.props.children}</div>
            </div>
        );
    }
    toggle() {
        this.setState({open: !this.state.open});
        this.updateSidenav(!this.state.open);
    }
    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateSidenav(this.state.open);
        window.addEventListener("resize", this.updateSidenav.bind(this));
    }
    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSidenav.bind(this));
    }
    /**
     * Make Sidenav responsive
     */
    updateSidenav(isStateOpen) {
        let belowLimits = window.innerWidth < 1024;
        let isOpen = false;

        if (belowLimits) {
            isOpen = !this.state.docked ? isStateOpen : false;
            this.setState({open: isOpen, docked: !belowLimits, style: this.getStyle(false)});
        } else {
            isOpen = !this.state.docked ? true : isStateOpen;
            this.setState({open: isOpen, docked: !belowLimits, style: this.getStyle(isOpen)});
        }
    }
    getStyle(isOpen) {
        let style = isOpen ?
            {width: 'calc(100% - 296px)', marginLeft: '256px'} :
            {width: 'calc(100% - 40px)', marginLeft: 'initial'};
        return Object.assign(style, styles.root);
    }

}

export default App;
