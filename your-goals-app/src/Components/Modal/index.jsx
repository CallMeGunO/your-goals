import React from 'react'
import './styles.css'

const Modal = ({isVisible, setIsVisible, isClosable, children}) => {
    return(
    <div className={isVisible ? 'modal active' : 'modal'} onClick={() => setIsVisible(!isClosable)}>
        <div className={isVisible ? 'modal-content active' : 'modal-content'} 
        onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
    )
}

export default Modal