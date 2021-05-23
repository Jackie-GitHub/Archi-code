import React from 'react';
import Backdrop from './Backdrop';

const SideBar = (props) => {
    return(
        <div>
            <div onClick={props.onclick} >
                <Backdrop show={props.onMenuClick} />
            </div>
            <div className="SideBar" style={{transform:props.onMenuClick? 'translateX(0)':'translateX(100%)',opacity:props.onMenuClick?'1':'0'}}>
                {props.children}
            </div>            
        </div>
    );
};

export default SideBar;