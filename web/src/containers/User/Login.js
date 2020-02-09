import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './actions';
import { changeWindow } from '../Navigation/actions';
import LoginView from '../../components/Login';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <LoginView onSubmit={this.props.loginUser} onClick={() => this.props.changeWindow(null)} />
            </>
        );
    }
}

export default connect(null, { loginUser, changeWindow })(Login);

