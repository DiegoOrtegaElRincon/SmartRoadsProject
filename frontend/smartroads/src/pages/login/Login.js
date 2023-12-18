import React from 'react';
import Header from '../../components/header/Header';
import LoginForm from '../../components/login/Login';

const Login = () => {
    return (
        <div>
            <Header title={"Login"}/>
            <LoginForm/>
        </div>
    );
};

export default Login;
