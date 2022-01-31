import React from 'react'
import { FiCheck } from 'react-icons/fi'


const CustomCheckbox = ({
    value, name, onChange, label, readOnly
}) => {
    return <div className='d-flex flex-row align-items-center'>
        <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            type='checkbox'
            checked={value}
            hidden={true}
            readOnly={readOnly}
        />
        <label htmlFor={name} className='custom-checkbox'>
            <FiCheck />
        </label>
        <label htmlFor={name} className='small-text'>{label}</label>
    </div>
}

export default CustomCheckbox