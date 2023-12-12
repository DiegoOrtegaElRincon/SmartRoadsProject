import React from 'react';
import LoginForm from '../../components/login/Login';
import AdminHeader from '../../components/header/AdminHeader';

const Login = () => {
    return (
        <div>
            <AdminHeader/>
            <LoginForm key={'Alert Tracker'}/>
        </div>
    );
};

export default Login;
