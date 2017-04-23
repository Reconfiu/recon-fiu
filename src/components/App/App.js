import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import '../../App.css';
import { logout } from './../../shared/communications';
import {Link, browserHistory} from "react-router";
import Sidenav from '../Sidenav/Sidenav';
import {styles} from './styles';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true, docked: true};
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
            {width: 'calc(100% - 256px)', marginLeft: '256px',color:"#B6862C", backgroundColor: this.state.color } :
            {width: 'calc(100%)', marginLeft: 'initial',color:"#B6862C",backgroundColor: this.state.color };
        return Object.assign(styles.root, style);
    }

    handleLogout(){
        logout().then(resp => {
            console.log(resp)
            let { status } = resp
            if (status === 200) {
                window.sessionStorage.clear()   
                window.localStorage.clear()
                browserHistory.push("/login")             
            }
        }).catch(e=>{
            console.log(e)
        });
    }

    render() {
        return (
            <div className="App">
                <AppBar
                    style={{position: 'fixed', backgroundColor: "#081E3F"}} title="ReconFIU"
                    onLeftIconButtonTouchTap={this.toggle.bind(this)}
                    iconElementRight={<Link to="login"><FlatButton onClick={this.handleLogout} labelStyle={{color:"#DDDDDD"}} label="Logout" /></Link>}
                />
                <Sidenav open={this.state.open} docked={this.state.docked} onToggle={this.toggle.bind(this)}/>
                <div style={this.state.style}>{this.props.children}</div>
            </div>
        );
    }
}

export default App;
