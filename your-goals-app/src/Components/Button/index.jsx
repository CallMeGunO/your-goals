import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const Button = ({ title, handler, primary, color }) => {
    return (
        <div 
            onClick={handler} 
            className={`button-container button-${primary ? 'primary' : 'secondary'} ${color}`}
        >
            <div className='button-title'>{title}</div>
        </div>
    )
}

Button.propTypes = {
    title: PropTypes.string,
    handler: PropTypes.func,
    primary: PropTypes.bool,
    color: PropTypes.string
}

Button.defaultProps = {
    primary: true,
    color: ''
}

export default Button

