import React from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import './Login.css';
import RaisedButton from 'material-ui/RaisedButton';
// import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { login, signUp } from './../../shared/communications';
import { browserHistory } from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: '',
            signUpActive: true,
            message: ''
        };

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.signUpPasswordChange = this.signUpPasswordChange.bind(this);
        this.signUpUsernameChange = this.signUpUsernameChange.bind(this);
        this.logInUsernameChange = this.logInUsernameChange.bind(this);
        this.logInPasswordChange = this.logInPasswordChange.bind(this);
        this.toggleSignUpLogin = this.toggleSignUpLogin.bind(this);

        
    }
    componentDidMount(){
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        if (user)
            browserHistory.push('/courses')

    }
    toggleSignUpLogin() {
        this.setState({
            signUpActive: !this.state.signUpActive
        });
    }

    handleSignUp(event) {
       signUp(this.state.loginUsername, this.state.loginPassword).then((resp) => {
            let { status, message } = resp
            this.setState({
                message
            })
            if (status === 201) {
                this.setState({
                    signUpActive: !this.state.signUpActive
                })
            }
        }).catch(e=>{
            console.log(e)
        });

        event.preventDefault();
    }

    handleLogin(event) {

       login(this.state.loginUsername, this.state.loginPassword).then((resp) => {
            console.log(resp);
            let { status, message, data } = resp
            this.setState({
                message
            });
            if (status === 200) {
                window.sessionStorage.setItem('user', JSON.stringify(data))
                browserHistory.push('/courses');
            }
        }).catch(e=>{
            let {statusCode} = e
            if (statusCode === 409)
                browserHistory.push('/courses')
        });
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
        const buttonStyle = { margin: 30, width: 200 };
        const textStyle = { color: "#DDDDDD"
        };
        const loginPane = {
            width: 400,
            backgroundColor: "#081E3F",
            color: "#DDDDDD"
        };
        const LoginButton = {
            backgroundColor: "#B6862C",
            color: "#DDDDDD"
        };
        const InputStyle = {
            color: "#DDDDDD"
        };
        return (
            <div className='login-wrapper' >
                <Drawer open={true} containerStyle={loginPane} openSecondary={true}>
                    {
                        this.state.signUpActive &&
                        <form onSubmit={this.handleLogin}>
                            <div className='login-container'>
                                <TextField
                                    inputStyle={InputStyle}
                                    hintStyle={InputStyle}
                                    hintText='Email'
                                    value={this.state.loginUsername}
                                    onChange={this.logInUsernameChange}
                                    errorText='This field is required'
                                /><br />
                                <TextField
                                    inputStyle={InputStyle}
                                    hintStyle={InputStyle}
                                    hintText='Password'
                                    type = 'password'
                                    value={this.state.loginPassword}
                                    onChange={this.logInPasswordChange}
                                    errorText='This field is required'
                                /><br />
                                <RaisedButton onClick={this.handleLogin} buttonStyle={LoginButton} label='LOGIN' primary={true}
                                    style={buttonStyle} />
                                <div className='login-text' labelStyle={textStyle}>Don't have an account?<FlatButton
                                    label='Register' primary={true}
                                    onClick={this.toggleSignUpLogin} />
                                </div>
                                <h4>{this.state.message}</h4>
                            </div>
                        </form>

                    }
                    {
                        !this.state.signUpActive &&
                        <form onSubmit={this.handleSignUp}>
                            <div className='login-container'>
                                <TextField
                                    inputStyle={InputStyle}
                                    hintStyle={InputStyle}
                                    hintText='Username/Email'
                                    value={this.state.loginUsername}
                                    onChange={this.signUpUsernameChange}
                                    errorText='This field is required'
                                /><br />
                                <TextField
                                    inputStyle={InputStyle}
                                    hintStyle={InputStyle}
                                    type = "password"
                                    hintText='Create a password'
                                    value={this.state.loginPassword}
                                    onChange={this.signUpPasswordChange}
                                    errorText='This field is required'
                                /><br />
                                <RaisedButton type='submit' label='SIGN UP' buttonStyle={LoginButton} primary={true} style={buttonStyle} />
                                <div className='login-text' labelStyle={textStyle}>Already have an account?<FlatButton
                                    label='login' primary={true}
                                    onClick={this.toggleSignUpLogin} />
                                </div>
                                {this.state.error && <div style={{ color: 'red' }}>{this.state.error}</div>}
                                <h4>{this.state.message}</h4>
                            </div>
                        </form>

                    }

                </Drawer>
            </div>
        );
    }
}