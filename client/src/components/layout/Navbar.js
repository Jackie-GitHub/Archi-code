import React, { Fragment,useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import logo from '../../resources/img/logo.png';
import {logout} from '../../actions/auth';
import SideBar from './Sidebar';


const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const authLinks = (
        <ul>
            <li><Link to="/"><i className="fa fa-comments px-2"></i><span>Posts</span></Link></li>
            <li><Link to="/profiles"><i className="fas fa-users px-2"></i><span>Neighbors</span></Link></li>
            <li><Link to="/me/profile"><i className="fas fa-home px-2"></i> <span>Home</span></Link></li>
            <li onClick={logout}>
                <Link to="/">
                    <i className="fas fa-sign-out-alt px-2"></i><span>Logout</span> 
                </Link>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="/"><i className="fas fa-home px-2"></i> <span>Posts</span></Link></li>
            <li><Link to="/profiles"><i className="fas fa-users px-2"></i> <span>Neighbors</span></Link></li>
            <li><Link to="/register"><i className="fas fa-user-plus px-2"></i> <span>Register</span></Link></li>
            <li><Link to="/login"><i className="fas fa-sign-in-alt px-2"></i> <span>Login</span></Link></li>
        </ul>
    );
    return (
        <Fragment>
            <SideBar onMenuClick={showSideBar} onclick={()=>{setShowSideBar(!showSideBar)}} >
                <div className="navMenuContent" >
                    {!loading && (<Fragment>{isAuthenticated ? <div className="navVtext">{authLinks}</div> : <div className="navVtext">{guestLinks}</div>}</Fragment>)}                  
                </div>
            </SideBar>
   

            <nav className="navbarWrap">
                <div className="container navbar">
                    <div className="navbar-logo">
                        <Link to="/"><img src={logo} alt="ArchiLogo" /></Link>
                    </div>
                    <div className="navbar-text">
                        {!loading && (<Fragment>{isAuthenticated ? <div className="navHtext">{authLinks}</div> : <div className="navHtext">{guestLinks}</div>}</Fragment>)}
                        <div className="navMenu" onClick={()=>{setShowSideBar(true)}}>
                            <i class="fas fa-bars"></i>
                        </div>
                    </div>
                </div>
            </nav>

        </Fragment>
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