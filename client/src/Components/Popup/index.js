import React, { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import style from './style.module.css'


const Popup = ({ show = false, onClose, children, size = '' }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflowY = 'hidden'
        } else document.body.style.overflowY = 'scroll'
        return ()=>{
            document.body.style.overflowY='scroll'
        }
    }, [show])
    return <div className={`${style['popup']} ${show ? '' : 'd-none'} ${size === "sm" ? style['popup-sm'] : ''}`}>
        <FiX className={style['close-icon']} onClick={onClose} />
        <div className={style['popup-background']} onClick={onClose}></div>
        <div className={`container card no-scrollbar ${style['popup-content']} ${show ? style['open'] : ''}`}>
            {show ? children : null}
        </div>
    </div>
}

export default Popup