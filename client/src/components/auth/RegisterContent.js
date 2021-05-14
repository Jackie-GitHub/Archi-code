import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Altert from '../layout/Alert';

import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';

const RegisterContent = ({setAlert,register,isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    
    const { name, email, password, password2 } = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({name,email,password});
        }
    };
      
    if (isAuthenticated) {
        return <Redirect to="/profile/profile" />;
    }
    
    return (
        <div className="RegisterContent">
            <h4 className="mb-3">Sign Up</h4>
            <form onSubmit={e=>onSubmit(e)}>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e=>onChange(e)}
                    required
                />
                </div>
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
                <p className="form-text">
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email
                </p>
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
                <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e=>onChange(e)}
                />
                </div>
                <input type="submit" className="btn btn-outline-success mb-3" value="Register" />
            </form>
            <Altert />
            <p className="my-1">
                Already have an account? <Link to="/login"><span className="textBold">Sign In</span></Link>
            </p>
        </div>
    )
}

RegisterContent.propTypes = {
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{setAlert,register})(RegisterContent);
