import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const NavbarHomepage = ({profileLink,postLink}) => {
    const style1 = {fontWeight:'bold',borderTopColor:'rgb(194,194,194)'};
    const style2 = {fontWeight:'normal',borderTopColor:'transparent'};
    const [style,setStyle] = useState([style1,style2])
    return (
        <div className=" navbarWarpSec">
            <div className="navbarSec">
                <ul>
                    <li style={style[0]}><Link to={profileLink }><span onClick={()=>setStyle([style1,style2])}>Profile</span></Link></li>
                    <li style={style[1]}><Link to={postLink}><span onClick={()=>setStyle([style2,style1])}>Posts</span></Link></li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarHomepage
