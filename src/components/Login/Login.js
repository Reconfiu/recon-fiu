import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import './Login.css';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from "react-router";
import FlatButton from 'material-ui/FlatButton';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: '',
            signUpUsername: '',
            signUpPassword: '',
            signUpActive: true
        };

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.signUpPasswordChange = this.signUpPasswordChange.bind(this);
        this.signUpUsernameChange = this.signUpUsernameChange.bind(this);
        this.logInUsernameChange = this.logInUsernameChange.bind(this);
        this.logInPasswordChange = this.logInPasswordChange.bind(this);
        this.toggleSignUpLogin = this.toggleSignUpLogin.bind(this);

        // Needed for onTouchTap
        injectTapEventPlugin();
    }

    toggleSignUpLogin() {
        this.setState({
            signUpActive: !this.state.signUpActive
        });
    }

    handleSignUp(event) {
        console.log('A name was submitted: ' + this.state.signUpUsername);
        console.log('A password was submitted: ' + this.state.signUpPassword);
        event.preventDefault();
    }

    signUpUsernameChange(event) {
        this.setState({
            signUpUsername: event.target.value
        });
    }

    signUpPasswordChange(event) {
        this.setState({
            signUpPassword: event.target.value
        });
    }

    logInUsernameChange(event) {
        this.setState({
            loginUsername: event.target.value
        });
    }

    logInPasswordChange(event) {
        this.setState({
            loginPassword: event.target.value
        });
    }

    handleLogin(event) {
        console.log('A name was submitted: ' + this.state.signUpUsername);
        console.log('A password was submitted: ' + this.state.signUpPassword);
        console.log('A name was submitted: ' + this.state.loginUsername);
        console.log('A password was submitted: ' + this.state.loginPassword);
        event.preventDefault();
    }

    render() {
        const wrapperStyle = {};
        const drawerStyle = {width: 400};
        const buttonStyle = {margin: 30, width: 200};
        const textStyle = {};

        return (
            <div className="login-wrapper" style={wrapperStyle}>
                <Drawer open={true} containerStyle={drawerStyle} openSecondary={true}>
                    {
                        this.state.signUpActive &&
                        <form onSubmit={this.handleSignUp}>
                            <div className="login-container">
                                <TextField
                                    hintText="Username/Email"
                                    value={this.state.signUpUsername}
                                    onChange={this.signUpUsernameChange}
                                    errorText="This field is required"
                                /><br />
                                <TextField
                                    hintText="Create a password"
                                    value={this.state.signUpPassword}
                                    onChange={this.signUpPasswordChange}
                                    errorText="This field is required"
                                /><br />
                                <RaisedButton type="submit" label="SIGN UP" primary={true} style={buttonStyle}/>
                                <div className="login-text" style={textStyle}>Already have an account?<FlatButton
                                    label="login" primary={true}
                                    onClick={this.toggleSignUpLogin}/></div>
                            </div>
                        </form>
                    }
                    {
                        !this.state.signUpActive &&
                        <form onSubmit={this.handleLogin}>
                            <div className="login-container">
                                <TextField
                                    hintText="Email"
                                    value={this.state.loginUsername}
                                    onChange={this.logInUsernameChange}
                                    errorText="This field is required"
                                /><br />
                                <TextField
                                    hintText="Password"
                                    value={this.state.loginPassword}
                                    onChange={this.logInPasswordChange}
                                    errorText="This field is required"
                                /><br />
                                <Link to="courses"><RaisedButton label="LOGIN" primary={true}
                                                                 style={buttonStyle}/></Link>
                                <div className="login-text" style={textStyle}>Don't have an account?<FlatButton
                                    label="Register" primary={true}
                                    onClick={this.toggleSignUpLogin}/></div>
                            </div>
                        </form>
                    }

                </Drawer>
            </div>
        );
    }
}