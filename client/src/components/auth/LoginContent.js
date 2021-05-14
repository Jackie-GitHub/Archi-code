import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import Alert from '../layout/Alert';

const LoginContent = ({login,isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const {email, password} = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email,password);
    };
    
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    
    return (
        <div className="RegisterContent">
            <h4 className="mb-3">Log In</h4>
            <form onSubmit={e=>onSubmit(e)}>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e=>onChange(e)}
                    required
                />
                </div>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e=>onChange(e)}
                />
                </div>
                <input type="submit" className="btn btn-outline-success mb-3" value="Login" />
            </form>
            <Alert />
            <p className="my-1">
                Don't have an account? <Link to="/register"><span className="textBold">Sign Up</span></Link>
            </p>
        </div>
    )
}

LoginContent.propTypes = {
    login:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(LoginContent);
