import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const NavbarHomepage = ({profileLink,postLink}) => {
    const [style,setStyle] = useState([{fontWeight:'bold',borderTopColor:'rgb(194,194,194)'},{fontWeight:'normal',borderTopColor:'transparent'}])
    return (
        <div className=" navbarWarpSec">
            <div className="navbarSec">
                <ul>
                    <li style={style[0]}><Link to={profileLink }><span onClick={()=>setStyle([style[1],style[0]])}>Profile</span></Link></li>
                    <li style={style[1]}><Link to={postLink}><span onClick={()=>setStyle([style[1],style[0]])}>Posts</span></Link></li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarHomepage
