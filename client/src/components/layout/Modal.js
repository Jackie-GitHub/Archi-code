import React from 'react';
import Backdrop from './Backdrop';

const Modal = (props) => {
    return(
        <div>
            <div onClick={props.onclick} >
                <Backdrop show={props.show} />
            </div>
            <div className="otr-modal" style={{transform:props.show ? 'translateY(0)':'translateY(-100vh)',opacity:props.show ? '1':'0'}}>
                {props.children}
            </div>
        </div>
    )
};

export default Modal;