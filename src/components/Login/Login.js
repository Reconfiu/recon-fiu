import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        // fetch('localhost:5000/api/login',{
        //     method: 'POST',
        //     headers: new Headers({'Content-Type': 'application/json' }),
        //     body: JSON.stringify({ user: { username:'joannier', password: '12345678' }}),
        //     mode: 'cors'
        // }).then(resp=>{
        //     resp.json().then(_resp=>{
        //         console.log(_resp)
        //     })
        // })
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        let template = null;
        if(this.state.isLoggedIn) {
            template = (
                <div>
                    <h1>Welcome back!</h1>
                    <button onClick={this.handleLogoutClick}>Logout</button>
                </div>
            );
        } else {
            template = (
                <div>
                    <h1>Please sign up.</h1>
                    <button onClick={this.handleLoginClick}>Login</button>
                </div>
            );
        }
        return  template;
    }
}