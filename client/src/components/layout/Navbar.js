import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import logo from '../../resources/img/logo.png';
import {logout} from '../../actions/auth';


const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
    const authLinks = (
        <ul>
            <li><Link to="/"><i className="fas fa-home"></i> Posts</Link></li>
            <li><Link to="/profiles"><i className="fas fa-users"></i> Members</Link></li>
            <li><Link to="/profile/profile"><i className="fas fa-user"></i> Home</Link></li>
            <li>
                <Link to="/">
                <div onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </div>
                </Link>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="/"><i className="fas fa-home"></i> Main</Link></li>
            <li><Link to="/profiles"><i className="fas fa-users"></i> Members</Link></li>
            <li><Link to="/register"><i className="fas fa-user-plus"></i> Register</Link></li>
            <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbarWrap">
        <div className="container navbar">
            <div className="navbar-logo">
                <Link to="/"><img src={logo} alt="ArchiLogo" /></Link>
            </div>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </div>
        </nav>
    )
};

Navbar.propTypes = {
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}
   
const mapStateToProps = state => ({
    auth:state.auth
})
  

export default connect(mapStateToProps,{logout})(Navbar);