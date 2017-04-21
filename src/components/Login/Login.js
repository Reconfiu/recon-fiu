import React from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import './Login.css';
import RaisedButton from 'material-ui/RaisedButton';
// import {Link} from "react-router";
import FlatButton from 'material-ui/FlatButton';
import {BASE_URL} from './../../shared/constants';
import {browserHistory} from 'react-router';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: '',
            signUpActive: true,
            message: ""
        };

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.signUpPasswordChange = this.signUpPasswordChange.bind(this);
        this.signUpUsernameChange = this.signUpUsernameChange.bind(this);
        this.logInUsernameChange = this.logInUsernameChange.bind(this);
        this.logInPasswordChange = this.logInPasswordChange.bind(this);
        this.toggleSignUpLogin = this.toggleSignUpLogin.bind(this);

        // Needed for onTouchTap
    }

    toggleSignUpLogin() {
        this.setState({
            signUpActive: !this.state.signUpActive
        });
    }

    handleSignUp(event) {
        axios.post(`${BASE_URL}/api/adduser`, {
            "user": {
                "username": this.state.loginUsername,
                "password": this.state.loginPassword
            }
        })
            .then((resp) => {
                console.log(resp)
                let {data} = resp
                this.setState({
                    message: data.message
                })
                if (data.status === 201){
                    this.setState({
                        signUpActive: !this.state.signUpActive
                    })
                }
            });

        event.preventDefault();
    }

    handleLogin(event) {
        axios.post(`${BASE_URL}/api/login`, {
            "user": {
                "username": this.state.loginUsername,
                "password": this.state.loginPassword
            }
        })
            .then(({data}) => {
                console.log(data);
                this.setState({
                    message: data.message
                });
                if (data.status === 200) {
                    window.localStorage.setItem("user", JSON.stringify(data.data))
                    browserHistory.push('/courses');                    
                }
            });
        console.log('A name was submitted: ' + this.state.loginUsername);
        console.log('A password was submitted: ' + this.state.loginPassword);
        event.preventDefault();
    }


    signUpUsernameChange(event) {
        this.setState({
            loginUsername: event.target.value
        });
    }

    signUpPasswordChange(event) {
        this.setState({
            loginPassword: event.target.value
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
                                <RaisedButton onClick={this.handleLogin} label="LOGIN" primary={true}
                                                                                 style={buttonStyle}/>
                                <div className="login-text" style={textStyle}>Don't have an account?<FlatButton
                                    label="Register" primary={true}
                                    onClick={this.toggleSignUpLogin}/>
                                </div>
                                <h4>{this.state.message}</h4>
                            </div>
                        </form>

                    }
                    {
                        !this.state.signUpActive &&
                        <form onSubmit={this.handleSignUp}>
                            <div className="login-container">
                                <TextField
                                    hintText="Username/Email"
                                    value={this.state.loginUsername}
                                    onChange={this.signUpUsernameChange}
                                    errorText="This field is required"
                                /><br />
                                <TextField
                                    hintText="Create a password"
                                    value={this.state.loginPassword}
                                    onChange={this.signUpPasswordChange}
                                    errorText="This field is required"
                                /><br />
                                <RaisedButton type="submit" label="SIGN UP" primary={true} style={buttonStyle}/>
                                <div className="login-text" style={textStyle}>Already have an account?<FlatButton
                                    label="login" primary={true}
                                    onClick={this.toggleSignUpLogin}/>
                                </div>
                                {this.state.error && <div style={{color: 'red'}}>{this.state.error}</div>}
                                <h4>{this.state.message}</h4>                                
                            </div>
                        </form>

                    }

                </Drawer>
            </div>
        );
    }
}