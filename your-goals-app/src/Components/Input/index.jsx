import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const Input = ({ type, placeholder, defaultValue, setValue }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            onBlur={(event) => {
                setValue(event.target.value)
            }}
            className={`input-container`}
            defaultValue={defaultValue}
        ></input>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    setValue: PropTypes.func
}

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    defaultValue: '',
}

export default Input
