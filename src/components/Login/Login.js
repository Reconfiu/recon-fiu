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
    componentDidMount() {
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
        }).catch(e => {
            let { error : { message } } = e
            this.setState({
                message
            })
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
        }).catch(e => {
            console.log(e)
            let { error : { message, status } } = e
            if (status === 409 && window.sessionStorage.getItem('user'))
                browserHistory.push('/courses')
            this.setState({
                message
            })
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
        const textStyle = {
            color: '#DDDDDD'
        };
        const loginPane = {
            width: 400,
            backgroundColor: '#081E3F',
            color: '#DDDDDD'
        };
        const LoginButton = {
            backgroundColor: '#B6862C',
            color: '#DDDDDD'
        };
        const InputStyle = {
            color: '#DDDDDD'
        };
        return (
            <div className='login-wrapper' >
                <Drawer open={true} containerStyle={loginPane} openSecondary={true}>
                    {
                        this.state.signUpActive &&
                        <form onSubmit={this.handleLogin} className='form login-form'>
                            <div className='form-group'>
                                <TextField
                                    inputStyle={InputStyle}
                                    hintStyle={InputStyle}
                                    hintText='Email'
                                    value={this.state.loginUsername}
                                    onChange={this.logInUsernameChange}
                                    errorText={this.state.message}
                                /><br />
                                <TextField
                                    inputStyle={InputStyle}
                                    hintStyle={InputStyle}
                                    hintText='Password'
                                    type='password'
                                    value={this.state.loginPassword}
                                    onChange={this.logInPasswordChange}
                                /><br />
                                <RaisedButton onClick={this.handleLogin} buttonStyle={LoginButton} label='LOGIN' primary={true}
                                    style={buttonStyle} />
                                <div className='login-text' labelStyle={textStyle}><h5>Don't have an account?</h5><FlatButton
                                    label='Register' primary={true}
                                    onClick={this.toggleSignUpLogin} />
                                </div>
                            </div>
                        </form>
                    }
                    {
                        !this.state.signUpActive &&
                        <form onSubmit={this.handleSignUp} className='form login-form'>
                            <div className='form-group'>
                                <TextField
                                    inputStyle={InputStyle}
                                    hintStyle={InputStyle}
                                    hintText='FIU - Email'
                                    value={this.state.loginUsername}
                                    onChange={this.signUpUsernameChange}
                                    errorText={this.state.message}
                                /><br />
                                <TextField
                                    inputStyle={InputStyle}
                                    hintStyle={InputStyle}
                                    type='password'
                                    hintText='Create a password'
                                    value={this.state.loginPassword}
                                    onChange={this.signUpPasswordChange}
                                /><br />
                                <RaisedButton type='submit' label='SIGN UP' buttonStyle={LoginButton} primary={true} style={buttonStyle} />
                                <div className='login-text' labelStyle={textStyle}><h5>Already have an account?</h5>
                                    <FlatButton
                                    label='login' primary={true}
                                    onClick={this.toggleSignUpLogin}/>
                                </div>
                                {this.state.error && <div style={{ color: 'red' }}>{this.state.error}</div>}
                            </div>
                        </form>

                    }

                </Drawer>
            </div>
        );
    }
}